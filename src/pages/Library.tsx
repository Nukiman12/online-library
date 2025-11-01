import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BooksContext';

const Library: React.FC = () => {
  const { publicBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', 'Классика', 'Фантастика', 'Детектив', 'Роман', 'Наука'];

  const filteredBooks = publicBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleShare = (bookId: string) => {
    // TODO: Implement share modal
    alert(`Поделиться книгой ${bookId}`);
  };

  const handleDownload = (bookId: string) => {
    // TODO: Implement download
    alert(`Скачать книгу ${bookId}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Публичная библиотека</h1>
        <p className="text-gray-600">Откройте для себя коллекцию книг от сообщества</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {genre === 'all' ? 'Все' : genre}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onShare={handleShare}
              onDownload={handleDownload}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Книги не найдены</p>
          <p className="text-gray-400 text-sm mt-2">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
};

export default Library;



