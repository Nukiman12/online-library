import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Image, File, ArrowLeft } from 'lucide-react';
import { useBooks } from '../contexts/BooksContext';
import { useAuth } from '../contexts/AuthContext';

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: 'Классика',
    pages: '',
    language: 'Русский',
    isPublic: true,
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);

  const genres = ['Классика', 'Фантастика', 'Детектив', 'Роман', 'Наука', 'Биография'];
  const languages = ['Русский', 'Английский', 'Немецкий', 'Французский', 'Испанский'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Необходимо войти в систему');
      return;
    }

    // Create cover URL from file (in real app, upload to server)
    const coverUrl = coverFile ? URL.createObjectURL(coverFile) : undefined;
    const fileUrl = bookFile ? URL.createObjectURL(bookFile) : undefined;

    addBook({
      ...formData,
      pages: parseInt(formData.pages) || undefined,
      coverUrl,
      fileUrl,
      uploadedBy: user.id,
      sharedWith: [],
    });

    alert('Книга успешно загружена!');
    navigate('/my-books');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Назад
      </button>

      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Загрузить новую книгу</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название книги *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Введите название"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Автор *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="input-field"
              placeholder="Имя автора"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-32"
              placeholder="Краткое описание книги"
              required
            />
          </div>

          {/* Genre and Language */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Жанр *
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="input-field"
                required
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Язык *
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="input-field"
                required
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество страниц
            </label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              className="input-field"
              placeholder="320"
            />
          </div>

          {/* Cover Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Обложка книги
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-primary-600 hover:text-primary-700 font-medium">
                  Выберите изображение
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              {coverFile && (
                <p className="text-sm text-gray-600 mt-2">{coverFile.name}</p>
              )}
            </div>
          </div>

          {/* Book File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Файл книги
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-primary-600 hover:text-primary-700 font-medium">
                  Выберите файл
                </span>
                <input
                  type="file"
                  accept=".pdf,.epub,.mobi,.txt"
                  onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">PDF, EPUB, MOBI, TXT</p>
              {bookFile && (
                <p className="text-sm text-gray-600 mt-2">{bookFile.name}</p>
              )}
            </div>
          </div>

          {/* Public/Private */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              Сделать книгу публичной (доступна всем пользователям)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
              <UploadIcon className="w-5 h-5" />
              Загрузить книгу
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;

