export interface Env {
  DB: D1Database;
  BOOKS_BUCKET: R2Bucket;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url?: string;
  file_url?: string;
  uploaded_by: string;
  uploaded_at: string;
  genre: string;
  pages?: number;
  language: string;
  is_public: boolean;
}

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   avatar?: string;
//   created_at: string;
// }

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Books endpoints
    if (path === '/api/books' && request.method === 'GET') {
      return await getBooks(env, corsHeaders);
    }

    if (path === '/api/books' && request.method === 'POST') {
      return await createBook(request, env, corsHeaders);
    }

    if (path.startsWith('/api/books/') && request.method === 'GET') {
      const bookId = path.split('/')[3];
      return await getBook(bookId, env, corsHeaders);
    }

    if (path.startsWith('/api/books/') && request.method === 'DELETE') {
      const bookId = path.split('/')[3];
      return await deleteBook(bookId, env, corsHeaders);
    }

    // Share endpoints
    if (path === '/api/share' && request.method === 'POST') {
      return await shareBook(request, env, corsHeaders);
    }

    // Messages endpoints
    if (path === '/api/messages' && request.method === 'GET') {
      return await getMessages(request, env, corsHeaders);
    }

    if (path === '/api/messages' && request.method === 'POST') {
      return await sendMessage(request, env, corsHeaders);
    }

    // User endpoints
    if (path === '/api/users' && request.method === 'GET') {
      return await getUsers(env, corsHeaders);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function getBooks(env: Env, headers: Record<string, string>): Promise<Response> {
  const result = await env.DB.prepare(
    'SELECT * FROM books WHERE is_public = 1 ORDER BY uploaded_at DESC'
  ).all();

  return new Response(JSON.stringify(result.results), {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function getBook(bookId: string, env: Env, headers: Record<string, string>): Promise<Response> {
  const result = await env.DB.prepare(
    'SELECT * FROM books WHERE id = ?'
  ).bind(bookId).first();

  if (!result) {
    return new Response('Book not found', { status: 404, headers });
  }

  return new Response(JSON.stringify(result), {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function createBook(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const bookData = await request.json() as Omit<Book, 'id' | 'uploaded_at'>;
  const bookId = crypto.randomUUID();
  const uploadedAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO books (id, title, author, description, cover_url, file_url, uploaded_by, uploaded_at, genre, pages, language, is_public)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    bookId,
    bookData.title,
    bookData.author,
    bookData.description,
    bookData.cover_url || null,
    bookData.file_url || null,
    bookData.uploaded_by,
    uploadedAt,
    bookData.genre,
    bookData.pages || null,
    bookData.language,
    bookData.is_public ? 1 : 0
  ).run();

  return new Response(JSON.stringify({ 
    id: bookId, 
    uploaded_at: uploadedAt,
    ...bookData 
  }), {
    status: 201,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function deleteBook(bookId: string, env: Env, headers: Record<string, string>): Promise<Response> {
  await env.DB.prepare('DELETE FROM books WHERE id = ?').bind(bookId).run();
  await env.DB.prepare('DELETE FROM book_shares WHERE book_id = ?').bind(bookId).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function shareBook(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const { bookId, userId } = await request.json() as { bookId: string; userId: string };
  const id = crypto.randomUUID();

  await env.DB.prepare(
    'INSERT INTO book_shares (id, book_id, user_id, shared_at) VALUES (?, ?, ?, ?)'
  ).bind(id, bookId, userId, new Date().toISOString()).run();

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function getMessages(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new Response('userId parameter required', { status: 400, headers });
  }

  const result = await env.DB.prepare(
    'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp DESC LIMIT 100'
  ).bind(userId, userId).all();

  return new Response(JSON.stringify(result.results), {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function sendMessage(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const message = await request.json() as Omit<Message, 'id' | 'timestamp' | 'read'>;
  const messageId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  await env.DB.prepare(
    'INSERT INTO messages (id, sender_id, receiver_id, content, timestamp, read) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(
    messageId,
    message.sender_id,
    message.receiver_id,
    message.content,
    timestamp,
    0
  ).run();

  return new Response(JSON.stringify({ 
    id: messageId, 
    ...message, 
    timestamp, 
    read: false 
  }), {
    status: 201,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function getUsers(env: Env, headers: Record<string, string>): Promise<Response> {
  const result = await env.DB.prepare(
    'SELECT id, username, email, avatar, created_at FROM users'
  ).all();

  return new Response(JSON.stringify(result.results), {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

