# Патрубки (Work_1)

Full-stack приложение: backend (Spring Boot), frontend (React + Vite).

## Структура репозитория

```
Work_1/
├── backend/                    # Spring Boot (Maven, Java 21), порт 8095
│   ├── pom.xml
│   └── src/main/
│       ├── java/patrubki/
│       │   ├── config/         # SecurityConfig, CorsConfig
│       │   ├── controller/     # REST-контроллеры
│       │   ├── service/
│       │   ├── repository/
│       │   ├── entity/
│       │   ├── dto/
│       │   └── security/
│       └── resources/
│           ├── application.yml
│           └── static/         # в проде — билд фронта
├── frontend/                   # React (Vite), в dev порт 5173
│   ├── package.json
│   ├── vite.config.js         # proxy /api → http://localhost:8095
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api/
│       ├── App.jsx, main.jsx
│       └── index.css          # корпоративные цвета (голубой, песочный, белый)
└── README.md
```

## Зависимости

- Сейчас — из интернета (Maven Central, npm). В проде — Artifactory (настроить позже).

## Запуск (Фаза 1)

### Backend

```bash
cd backend
mvn spring-boot:run
```

Сервер поднимается на **8095**. Тестовый эндпоинт: `GET http://localhost:8095/api/health` → `{"status":"ok","service":"patrubki-backend"}`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Фронт на **5173**. Запросы к `/api` проксируются на `http://localhost:8095`.

### Итог Фазы 1

- Backend на 8095 (тестовый GET `/api/health`).
- Frontend на 5173 с proxy на backend.
- Зависимости подтягиваются из интернета.
