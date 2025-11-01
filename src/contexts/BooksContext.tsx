import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Book } from '../types';

interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'uploaded_at'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
  shareBook: (bookId: string, userId: string) => void;
  myBooks: Book[];
  sharedBooks: Book[];
  publicBooks: Book[];
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load mock data
    const mockBooks: Book[] = [
      {
        id: '1',
        title: 'Война и мир',
        author: 'Лев Толстой',
        description: 'Роман-эпопея, описывающий русское общество в эпоху войн против Наполеона.',
        cover_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        uploaded_by: '1',
        uploaded_at: new Date().toISOString(),
        genre: 'Классика',
        pages: 1225,
        language: 'Русский',
        shared_with: [],
        is_public: true,
      },
      {
        id: '2',
        title: '1984',
        author: 'Джордж Оруэлл',
        description: 'Антиутопический роман о тоталитарном обществе.',
        cover_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        uploaded_by: '1',
        uploaded_at: new Date().toISOString(),
        genre: 'Фантастика',
        pages: 328,
        language: 'Английский',
        shared_with: [],
        is_public: true,
      },
      {
        id: '3',
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        description: 'Роман, сочетающий философскую притчу, любовную историю и сатиру.',
        cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        uploaded_by: '1',
        uploaded_at: new Date().toISOString(),
        genre: 'Классика',
        pages: 480,
        language: 'Русский',
        shared_with: [],
        is_public: true,
      },
    ];
    setBooks(mockBooks);
  }, []);

  const addBook = (book: Omit<Book, 'id' | 'uploaded_at'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      uploaded_at: new Date().toISOString(),
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(books.map(book => (book.id === id ? { ...book, ...updatedBook } : book)));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  const shareBook = (bookId: string, userId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book && !book.shared_with.includes(userId)) {
      updateBook(bookId, { shared_with: [...book.shared_with, userId] });
    }
  };

  const myBooks = books.filter(book => book.uploaded_by === '1'); // TODO: use actual user ID
  const sharedBooks = books.filter(book => book.shared_with.includes('1')); // TODO: use actual user ID
  const publicBooks = books.filter(book => book.is_public);

  return (
    <BooksContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        getBookById,
        shareBook,
        myBooks,
        sharedBooks,
        publicBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

