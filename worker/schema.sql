-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT NOT NULL
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_url TEXT,
  file_url TEXT,
  uploaded_by TEXT NOT NULL,
  uploaded_at TEXT NOT NULL,
  genre TEXT NOT NULL,
  pages INTEGER,
  language TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT 1,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Book shares table
CREATE TABLE IF NOT EXISTS book_shares (
  id TEXT PRIMARY KEY,
  book_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  shared_at TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Share requests table
CREATE TABLE IF NOT EXISTS share_requests (
  id TEXT PRIMARY KEY,
  book_id TEXT NOT NULL,
  from_user_id TEXT NOT NULL,
  to_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (from_user_id) REFERENCES users(id),
  FOREIGN KEY (to_user_id) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_uploaded_by ON books(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_books_is_public ON books(is_public);
CREATE INDEX IF NOT EXISTS idx_book_shares_book_id ON book_shares(book_id);
CREATE INDEX IF NOT EXISTS idx_book_shares_user_id ON book_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);

