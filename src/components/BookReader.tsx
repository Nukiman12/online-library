import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookReaderProps {
  fileUrl?: string;
  fileData?: string;
  title: string;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ fileUrl, fileData, title, onClose }) => {
  const [zoom, setZoom] = useState(100);

  // For demo purposes, show a simple text reader
  const demoText = `
    Глава 1: Введение
    
    Это демонстрационный текст книги "${title}". 
    
    В реальном приложении здесь будет отображаться содержимое загруженного файла PDF, EPUB или другого формата.
    
    Функционал включает:
    - Постраничное отображение
    - Изменение масштаба
    - Сохранение прогресса чтения
    - Закладки
    - Выделение текста
    - Заметки
    
    Для полной интеграции можно использовать библиотеки:
    - react-pdf для PDF файлов
    - epub.js для EPUB файлов
    - Или встроенный iframe для различных форматов
    
    Глава 2: Основное содержание
    
    Здесь идет основной текст книги...
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card w-full max-w-4xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                title="Уменьшить"
              >
                <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[4rem] text-center">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                title="Увеличить"
              >
                <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition ml-2"
                title="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-8 bg-white dark:bg-gray-900">
            <div 
              style={{ fontSize: `${zoom}%` }}
              className="max-w-3xl mx-auto"
            >
              {fileUrl || fileData ? (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                    Загруженный файл: {fileUrl || 'Локальный файл'}
                  </p>
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">
                    {demoText}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    Файл книги не загружен
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer - Navigation */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="btn-secondary flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              Предыдущая страница
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Страница 1 из 1
            </span>
            <button className="btn-secondary flex items-center gap-2">
              Следующая страница
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookReader;



