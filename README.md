# KTS Project Next.js

Миграция приложения с `React + MobX + Vite` на `Next.js 15` с использованием `App Router`.

## Стек

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MobX`
- `SCSS Modules`

## Скрипты

```bash
yarn dev
yarn build
yarn start
yarn lint
```

## Архитектура

- Публичные страницы каталога и товара реализованы через `App Router` в `src/app`.
- Загрузка данных каталога и товара выполняется на сервере через встроенный `fetch`.
- Корзина реализована как клиентская часть на `MobX`.
- Глобальный store подключён через `RootStoreProvider`.

## Переменные окружения

Создайте `.env.local` при необходимости:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://front-school-strapi.ktsdev.ru/api
NEXT_PUBLIC_ENABLE_CART_SYNC=false
```

## Ссылки

- Prod: `not deployed yet`
- Repository: `https://github.com/Olbench/kts_migrated_project.git`

## Примечания

- Для внешних изображений настроены `images.remotePatterns`.
- Шрифт подключён через `next/font/local`.
- Если внешний Strapi или MinIO недоступен по сети, каталог и изображения могут не загрузиться.
