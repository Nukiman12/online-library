import React, { useState } from 'react';
import { Book as BookIcon, Trash2 } from 'lucide-react';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BooksContext';

const MyBooks: React.FC = () => {
  const { myBooks, sharedBooks, deleteBook } = useBooks();
  const [activeTab, setActiveTab] = useState<'my' | 'shared'>('my');

  const handleDelete = (bookId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      deleteBook(bookId);
    }
  };

  const displayBooks = activeTab === 'my' ? myBooks : sharedBooks;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои книги</h1>
        <p className="text-gray-600">Управляйте своей личной коллекцией</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'my'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Загруженные мной ({myBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'shared'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Доступные мне ({sharedBooks.length})
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {displayBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayBooks.map(book => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              {activeTab === 'my' && (
                <button
                  onClick={() => handleDelete(book.id)}
                  className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 card">
          <BookIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">
            {activeTab === 'my' ? 'Вы еще не загрузили книг' : 'С вами еще не поделились книгами'}
          </p>
          {activeTab === 'my' && (
            <p className="text-gray-400 text-sm">
              Загрузите свою первую книгу, чтобы поделиться ею с другими
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBooks;



