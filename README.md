# PromptShield v2

PromptShield is a full-stack application for analyzing user prompts for potential prompt-injection attacks. It combines deterministic security rules with a machine-learning classification service, applies a risk policy, and—when a prompt is allowed—uses a local Ollama model to generate a response. Authenticated users can review their chat history and security analytics.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [How it works](#how-it-works)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Local development](#local-development)
- [Available commands](#available-commands)
- [API overview](#api-overview)
- [Appearance](#appearance)
- [Security notes](#security-notes)

## Features

- Account registration, login, JWT-based authentication, and password-recovery endpoints.
- Prompt analysis using security rules and an ML probability score.
- Risk-based allow/block decisions; allowed prompts are sent to Ollama for a response.
- Per-user chat history with search, status/date filters, and pagination.
- Dashboard metrics based on the user's saved chat logs, including blocked requests, detection rate, and average risk.
- Attack-category distribution and request activity over the last seven days.
- Light, dark, and system appearance preferences, saved in the browser.
- Responsive navigation and layouts for desktop and mobile.

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS v4 |
| Frontend API requests | Axios |
| Backend API | Node.js, Express 5, TypeScript |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Database and ORM | PostgreSQL, Prisma 6, `@prisma/adapter-pg`, `pg` |
| ML API | Python, FastAPI, Pydantic, joblib-loaded TF-IDF + Logistic Regression model |
| Response generation | Ollama, configured with the `phi3:mini` model |

## How it works

1. A signed-in user submits a prompt from the web app.
2. The Express API validates the JWT and prompt.
3. The backend analyzes the prompt with rule-based detection and requests a probability from the ML API.
4. The risk engine combines these signals and the policy engine decides whether to allow or block the prompt.
5. If allowed, the backend requests a response from Ollama and validates the output.
6. The prompt, response, decision, risk, and detection metadata are saved to PostgreSQL and can be viewed in chat history and dashboard analytics.

If the ML service is unavailable, the backend blocks the request rather than sending an unanalyzed prompt to the language model.

## Repository layout

```text
.
├── frontend/                  # Next.js web application
│   └── app/
│       ├── authentication/    # Login, signup, and password recovery UI
│       ├── components/        # Shared navigation, chat UI, charts, and cards
│       ├── pages/             # Page implementations
│       └── settings/          # Settings route
├── backend/                   # Express API and Prisma schema/migrations
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── security/
│   │   └── services/
│   └── tests/
└── ML/                        # FastAPI classifier and saved model artifact
    ├── app.py
    └── models/
```

## Prerequisites

- Node.js and npm (use a version supported by the installed Next.js release).
- Python 3 and pip.
- PostgreSQL.
- [Ollama](https://ollama.com/) with the `phi3:mini` model available.
- The included classifier artifact at `ML/models/promptshield_tfidf_lr.joblib`.

The ML API loads the model artifact when it starts. It will fail to start if the artifact is missing.

## Local development

### 1. Configure the backend

Create a local `backend/.env` file for the backend's private connection and service settings. It needs your PostgreSQL connection, a private JWT signing secret, and the URLs for Ollama and the ML service. Keep this file local and do not share or commit it. For a standard local setup, the backend listens on port `5000`, Ollama is available at `http://localhost:11434`, and the ML service is available at `http://localhost:8000`.

Create a PostgreSQL database for PromptShield. Apply migrations and generate the Prisma client:

```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma generate
```

### 2. Start the ML service

Install the Python packages used by the API and model artifact, then start FastAPI from the `ML` directory:

```bash
cd ML
python -m pip install fastapi uvicorn pydantic joblib scikit-learn
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

The service exposes `GET /health` and `POST /predict`.

### 3. Prepare Ollama

Start Ollama and ensure its `phi3:mini` model is installed and available:

```bash
ollama pull phi3:mini
```

The backend sends generation requests to the configured Ollama endpoint.

### 4. Start the backend API

In a separate terminal:

```bash
cd backend
npm run dev
```

The API listens on port `5000` by default. Its root health endpoint is `GET http://localhost:5000/`.

### 5. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend connects to the backend at `http://localhost:5000` by default. If your backend runs elsewhere, set its base URL in the frontend's local `.env.local` settings file.

The backend CORS configuration currently allows the local frontend origin `http://localhost:3000`; update it in `backend/src/server.ts` when using a different frontend origin.

## Available commands

Run frontend commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

Run backend commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API in watch mode with `tsx`. |
| `npm run build` | Compile TypeScript into `backend/dist`. |
| `npm start` | Run the compiled API. |
| `npx prisma migrate deploy` | Apply checked-in database migrations. |
| `npx prisma generate` | Generate the Prisma client. |

## API overview

All application API routes are served by the backend:

| Route | Purpose |
| --- | --- |
| `POST /api/auth/signup` | Register an account. |
| `POST /api/auth/login` | Authenticate and receive a JWT. |
| `POST /api/auth/forgot-password` | Start the password-recovery flow. |
| `GET /api/auth/me` | Current-user endpoint; note that this route does not currently apply the JWT middleware. |
| `POST /api/chat` | Analyze a prompt and return its decision and response. Requires a Bearer token. |
| `GET /api/logs` | Retrieve the authenticated user's chat logs. Requires a Bearer token. |
| `POST /api/policies/evaluate` | Evaluate a risk score against the policy. |
| `GET /api/models` | Return model-service information. |
| `GET /` | Backend health check. |

The ML service separately provides `GET /health` and `POST /predict`.

## Appearance

Choose **Light**, **Dark**, or **System** from **Settings → Appearance**. The selection applies throughout the app and is saved in the browser, so it remains active after reloads. **System** follows your operating system's current color-scheme preference and updates when that preference changes.

## Security notes

- Chat and log endpoints are protected by JWT authentication.
- Logs are retrieved only for the user identified by the verified JWT.
- Use a strong, unique JWT signing secret and keep it outside source control.
- Configure production CORS origins explicitly before deploying.
- Keep PostgreSQL, Ollama, and the ML API reachable only by services that need them.
- This project is under active development; review and test configuration and security controls before exposing it to the public internet.
