# Инструкция по развертыванию

## Cloudflare Workers + D1 + R2

### 1. Создание D1 базы данных

```bash
# Создайте D1 базу данных
npx wrangler d1 create library-db

# Скопируйте database_id из вывода команды
# Обновите wrangler.jsonc с полученным database_id

# Выполните миграцию схемы
npx wrangler d1 execute library-db --file=worker/schema.sql --remote
```

### 2. Создание R2 Bucket

```bash
# Создайте R2 bucket для хранения файлов книг
npx wrangler r2 bucket create library-books

# Bucket автоматически привяжется к вашему Worker
```

### 3. Развертывание

```bash
# Соберите и разверните на Cloudflare
npm run deploy
```

### 4. Локальная разработка

```bash
# Для локальной разработки используйте:
npm run dev

# Это запустит Vite dev server на http://localhost:5173
# Worker будет доступен через Cloudflare Dev Tunnels
```

### 5. Настройка переменных окружения

Создайте файл `.env.local` (не коммитьте его!):

```env
VITE_API_URL=https://your-worker-url.workers.dev
```

### 6. Инициализация базы данных (опционально)

Если нужно добавить тестовые данные:

```bash
# Создайте файл seed.sql с тестовыми данными
npx wrangler d1 execute library-db --file=worker/seed.sql --remote
```

## Android (Capacitor)

### Для сборки Android приложения:

```bash
# 1. Соберите web приложение
npm run build

# 2. Синхронизируйте с Android
npm run cap:sync

# 3. Откройте в Android Studio
npm run cap:open:android

# 4. Запустите на устройстве/эмуляторе
npm run cap:run:android
```

## Структура проекта

```
planer/
├── src/                    # React приложение
│   ├── components/         # React компоненты
│   ├── contexts/          # Context API (состояние)
│   ├── pages/             # Страницы приложения
│   └── types/             # TypeScript типы
├── worker/                # Cloudflare Worker (Backend)
│   ├── index.ts          # Главный файл Worker
│   ├── api.ts            # API endpoints
│   └── schema.sql        # Схема базы данных
├── android/              # Android проект (Capacitor)
└── dist/                 # Собранные файлы
```

## API Endpoints

### Books
- `GET /api/books` - Получить все публичные книги
- `GET /api/books/:id` - Получить книгу по ID
- `POST /api/books` - Создать новую книгу
- `DELETE /api/books/:id` - Удалить книгу

### Sharing
- `POST /api/share` - Поделиться книгой с пользователем

### Messages
- `GET /api/messages?userId=:id` - Получить сообщения пользователя
- `POST /api/messages` - Отправить сообщение

### Users
- `GET /api/users` - Получить список пользователей

## Troubleshooting

### Ошибка при развертывании
- Убедитесь, что вы вошли в Wrangler: `npx wrangler login`
- Проверьте, что database_id правильный в wrangler.jsonc

### База данных не работает
- Проверьте, что схема была применена: `npx wrangler d1 execute library-db --file=worker/schema.sql --remote`

### Android не собирается
- Проверьте, что Android Studio установлен
- Убедитесь, что Java JDK 17+ установлен
- Выполните `npm run build` перед `npm run cap:sync`

## Дополнительные ресурсы

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [R2 Storage Docs](https://developers.cloudflare.com/r2/)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

