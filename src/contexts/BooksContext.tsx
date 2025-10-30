import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Book } from '../types';

interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'uploadedAt'>) => void;
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
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        uploadedBy: '1',
        uploadedAt: new Date().toISOString(),
        genre: 'Классика',
        pages: 1225,
        language: 'Русский',
        sharedWith: [],
        isPublic: true,
      },
      {
        id: '2',
        title: '1984',
        author: 'Джордж Оруэлл',
        description: 'Антиутопический роман о тоталитарном обществе.',
        coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        uploadedBy: '1',
        uploadedAt: new Date().toISOString(),
        genre: 'Фантастика',
        pages: 328,
        language: 'Английский',
        sharedWith: [],
        isPublic: true,
      },
      {
        id: '3',
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        description: 'Роман, сочетающий философскую притчу, любовную историю и сатиру.',
        coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        uploadedBy: '1',
        uploadedAt: new Date().toISOString(),
        genre: 'Классика',
        pages: 480,
        language: 'Русский',
        sharedWith: [],
        isPublic: true,
      },
    ];
    setBooks(mockBooks);
  }, []);

  const addBook = (book: Omit<Book, 'id' | 'uploadedAt'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
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
    if (book && !book.sharedWith.includes(userId)) {
      updateBook(bookId, { sharedWith: [...book.sharedWith, userId] });
    }
  };

  const myBooks = books.filter(book => book.uploadedBy === '1'); // TODO: use actual user ID
  const sharedBooks = books.filter(book => book.sharedWith.includes('1')); // TODO: use actual user ID
  const publicBooks = books.filter(book => book.isPublic);

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

