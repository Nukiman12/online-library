import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Book as BookIcon,
  Calendar,
  User,
  Globe,
  FileText,
  BookOpen
} from 'lucide-react';
import { useBooks } from '../contexts/BooksContext';
import BookReader from '../components/BookReader';
import { motion } from 'framer-motion';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useBooks();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReader, setShowReader] = useState(false);
  
  const book = id ? getBookById(id) : undefined;

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Книга не найдена</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Вернуться к библиотеке
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    // TODO: Implement download
    alert('Функция загрузки в разработке');
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Назад
      </button>

      {/* Book Details */}
      <div className="card overflow-hidden">
        <div className="md:flex">
          {/* Cover Image */}
          <div className="md:w-1/3 bg-gray-200">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <BookIcon className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="md:w-2/3 p-8">
            <div className="mb-4">
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {book.genre}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{book.author}</p>

            <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

            {/* Book Metadata */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <FileText className="w-5 h-5 mr-2" />
                <span>{book.pages} страниц</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-2" />
                <span>{book.language}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(book.uploadedAt).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>Загрузил: User #{book.uploadedBy}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReader(true)}
                className="btn-primary flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Читать
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Скачать
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareModal(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Поделиться
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Поделиться книгой</h3>
            <input
              type="email"
              placeholder="Email получателя"
              className="input-field mb-4"
            />
            <div className="flex gap-3">
              <button className="btn-primary flex-1">Отправить</button>
              <button 
                onClick={() => setShowShareModal(false)}
                className="btn-secondary flex-1"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Book Reader */}
      {showReader && book && (
        <BookReader
          fileUrl={book.fileUrl}
          fileData={book.fileData}
          title={book.title}
          onClose={() => setShowReader(false)}
        />
      )}
    </div>
  );
};

export default BookDetail;

