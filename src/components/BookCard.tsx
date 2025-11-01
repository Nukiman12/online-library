import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Share2, Download, Eye } from 'lucide-react';
import type { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onShare?: (bookId: string) => void;
  onDownload?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onShare, onDownload }) => {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Book className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
          {book.genre}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{book.pages} стр.</span>
          <span>{book.language}</span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/book/${book.id}`}
            className="flex-1 btn-primary text-center text-sm flex items-center justify-center gap-1"
          >
            <Eye className="w-4 h-4" />
            Открыть
          </Link>
          {onShare && (
            <button
              onClick={() => onShare(book.id)}
              className="btn-secondary text-sm p-2"
              title="Поделиться"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
          {onDownload && book.file_url && (
            <button
              onClick={() => onDownload(book.id)}
              className="btn-secondary text-sm p-2"
              title="Скачать"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

