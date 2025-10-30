# 📚 Онлайн Библиотека - React + TypeScript + Vite + Capacitor + Cloudflare

Современное веб и мобильное приложение для обмена книгами с другими пользователями и общения в чате.

## ✨ Функционал

- 📖 **Публичная библиотека** - просмотр и поиск книг от всех пользователей
- 📤 **Загрузка книг** - добавление собственных книг с обложками
- 🤝 **Обмен книгами** - делитесь книгами с конкретными пользователями
- 💬 **Чат** - общайтесь с другими пользователями
- 🎨 **Современный UI** - красивый дизайн на Tailwind CSS
- 📱 **Android приложение** - нативное мобильное приложение через Capacitor
- ☁️ **Cloudflare Backend** - serverless API на Workers + D1 + R2

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Веб разработка

```bash
npm run dev          # Запуск dev сервера на http://localhost:5173
npm run build        # Сборка для production
npm run preview      # Предпросмотр production сборки
```

### Android разработка

#### Требования
- [Android Studio](https://developer.android.com/studio)
- Android SDK
- Java JDK 17+

#### Команды

```bash
npm run build:android     # Сборка + синхронизация с Android
npm run cap:sync          # Синхронизация ресурсов
npm run cap:open:android  # Открыть в Android Studio
npm run cap:run:android   # Запуск на устройстве/эмуляторе
```

### Cloudflare Workers (Backend)

#### Настройка

1. Войдите в Wrangler:
```bash
npx wrangler login
```

2. Создайте D1 базу данных:
```bash
npx wrangler d1 create library-db
```

3. Обновите `database_id` в `wrangler.jsonc`

4. Примените схему базы данных:
```bash
npx wrangler d1 execute library-db --file=worker/schema.sql --remote
```

5. Создайте R2 bucket:
```bash
npx wrangler r2 bucket create library-books
```

#### Развертывание

```bash
npm run deploy       # Деплой на Cloudflare
npm run cf-typegen   # Генерация типов Cloudflare
```

## 🏗️ Структура проекта

```
planer/
├── src/
│   ├── components/      # React компоненты
│   │   ├── Layout.tsx      # Главный лейаут с навигацией
│   │   └── BookCard.tsx    # Карточка книги
│   ├── contexts/        # React Context для состояния
│   │   ├── AuthContext.tsx     # Аутентификация
│   │   ├── BooksContext.tsx    # Управление книгами
│   │   └── ChatContext.tsx     # Чат
│   ├── pages/          # Страницы приложения
│   │   ├── Login.tsx       # Вход/Регистрация
│   │   ├── Library.tsx     # Публичная библиотека
│   │   ├── BookDetail.tsx  # Детали книги
│   │   ├── MyBooks.tsx     # Мои книги
│   │   ├── Upload.tsx      # Загрузка книг
│   │   └── Chat.tsx        # Чат
│   ├── types/          # TypeScript типы
│   └── App.tsx         # Главный компонент
├── worker/             # Cloudflare Worker (Backend API)
│   ├── index.ts        # Entry point
│   ├── api.ts          # API endpoints
│   └── schema.sql      # Схема БД
├── android/            # Android проект (Capacitor)
└── dist/              # Собранные файлы
```

## 🎨 Технологии

### Frontend
- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev server
- **Tailwind CSS** - Стилизация
- **React Router** - Маршрутизация
- **Lucide React** - Иконки
- **date-fns** - Работа с датами

### Mobile
- **Capacitor** - Нативные мобильные приложения

### Backend
- **Cloudflare Workers** - Serverless functions
- **D1** - SQLite база данных
- **R2** - Object storage для файлов

## 📡 API Endpoints

### Books
- `GET /api/books` - Получить все публичные книги
- `GET /api/books/:id` - Получить книгу по ID
- `POST /api/books` - Создать новую книгу
- `DELETE /api/books/:id` - Удалить книгу

### Sharing
- `POST /api/share` - Поделиться книгой

### Messages
- `GET /api/messages?userId=:id` - Получить сообщения
- `POST /api/messages` - Отправить сообщение

### Users
- `GET /api/users` - Список пользователей

## 📝 База данных (D1)

Схема включает таблицы:
- `users` - Пользователи
- `books` - Книги
- `book_shares` - Доступ к книгам
- `messages` - Сообщения
- `share_requests` - Запросы на доступ

## 🔧 Разработка

### Локальная разработка с mock данными

Приложение использует mock данные в контекстах для локальной разработки. После развертывания backend, обновите контексты для использования реальных API.

### Добавление новых книг

1. Войдите в приложение
2. Перейдите в раздел "Загрузить"
3. Заполните информацию о книге
4. Загрузите обложку и файл книги
5. Отметьте, будет ли книга публичной

## 🚨 Troubleshooting

### Ошибки сборки
- Убедитесь что все зависимости установлены: `npm install`
- Очистите кэш: `rm -rf node_modules dist && npm install`

### Android не собирается
- Проверьте версию Java: `java -version` (нужна 17+)
- Обновите Android Studio и SDK
- Выполните `npm run build` перед `cap sync`

### Backend не работает
- Проверьте логин в Wrangler: `npx wrangler whoami`
- Убедитесь что D1 база создана и схема применена
- Проверьте database_id в wrangler.jsonc

## 📄 Лицензия

MIT

## 👥 Автор

Создано для курсового проекта

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
