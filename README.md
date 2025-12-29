# Full‑Stack Portfolio

A modern portfolio website built as a **full‑stack** app:

- **Frontend:** React (Create React App)
- **Backend:** Python Flask + SQLAlchemy
- **Database:** SQLite (by default)

This repository supports **two ways to run**:

1) **Dev mode (recommended while developing):**
	- React dev server on **http://localhost:3000**
	- Flask API on **http://localhost:5000**
	- Frontend talks to backend via CRA proxy (no CORS headaches)

2) **Single‑server mode (production-like):**
	- Build React once (`frontend/build`)
	- Flask serves the SPA + `/api/*` routes from one server/origin

---

## Tech stack

### Frontend
- React 18 (Create React App)
- GSAP (animations / scroll reveals)
- react-icons
- CSS (neon + frosted-glass UI)

### Backend
- Flask
- flask-cors
- flask-sqlalchemy
- python-dotenv
- gunicorn (for production)

---

## Project structure

- `frontend/` — React application
  - `src/` — components, hooks, styling
  - `package.json` — scripts and dev proxy config
- `backend/` — Flask application
  - `app.py` — app factory + static build serving
  - `routes.py` — REST API (`/api/*`)
  - `models.py` — SQLAlchemy models (Project/Skill/Contact)
  - `seed.py` — seeds sample data into SQLite
- `Dockerfile` — multi-stage build (React build + gunicorn)
- `docker-compose.yml` — optional compose for deployment + SQLite volume

---

## Prerequisites

- **Node.js** (recommended: Node 18+ or 20+)
- **Python** 3.11+ (3.10+ usually works)

On Windows, make sure Python is installed with “Add to PATH”.

---

## Environment variables

### Backend (`.env` at repo root)

The backend loads env vars from the repo‑root `.env` (see `backend/config.py`).

- A ready-to-edit `.env` is included for local dev.
- A safe template is included as `.env.example`.

Common variables:

- `FLASK_ENV` — `development` or `production`
- `SECRET_KEY` — change for production
- `DATABASE_URL` — defaults to SQLite (e.g. `sqlite:///portfolio.db`)
- `CORS_ORIGINS` — comma-separated allowed origins for CORS

Optional SMTP variables (contact form email delivery):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_USE_TLS`
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

If SMTP is not configured, the contact form still **saves messages to SQLite**, but email sending is skipped.

### Frontend (`frontend/.env`)

The frontend can optionally set:

- `REACT_APP_API_URL` — when deploying frontend separately, set the backend base URL.

In local dev, you usually leave this empty and rely on the CRA proxy.
See `frontend/.env.example`.

---

## How frontend connects to backend

### Dev mode (two servers)

The frontend uses **relative API calls** (e.g. `/api/profile`).
Because `frontend/package.json` includes:

- `"proxy": "http://localhost:5000"`

Create React App will proxy `/api/*` requests to Flask automatically.

### Production / separate hosting

If you host the frontend and backend on different domains, set:

- `REACT_APP_API_URL=https://your-backend.example.com`

And set the backend CORS origins via `.env`:

- `CORS_ORIGINS=https://your-frontend.example.com`

---

## Run locally (Dev mode: two servers)

### 1) Backend (Flask)

From the repo root:

1. Create a virtual environment (first time):
	- `backend/venv`
2. Install dependencies (first time)
3. Seed the database (optional but recommended)
4. Start the server

By default Flask runs on:

- **http://127.0.0.1:5000**

VS Code tasks are included (recommended):

- `Backend: Create venv`
- `Backend: Install deps`
- `Backend: Seed DB`
- `Backend: Start`

### 2) Frontend (React)

In another terminal:

1. Install dependencies (first time)
2. Start the dev server

React runs on:

- **http://localhost:3000**

VS Code tasks:

- `Frontend: Install deps`
- `Frontend: Start`
- `Run All (dev)` (starts both backend + frontend)

---

## Run locally (Single server / production-like)

This mode makes Flask serve the built React app.

1) Build the frontend:

- Run `npm run build` inside `frontend/`
- This creates `frontend/build/`

2) Start the backend:

- Run `backend/app.py` (dev) or gunicorn (recommended for prod-like)

When `frontend/build/index.html` exists, Flask serves the SPA at `/` and keeps `/api/*` working.

---

## API endpoints

The backend exposes JSON endpoints under `/api`:

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/experience`
- `GET /api/education`
- `GET /api/certifications`
- `GET /api/activities`
- `POST /api/contact` (stores message and optionally sends SMTP email)

---

## Database

- Default DB: SQLite
- Tables: `projects`, `skills`, `contacts`

To load sample data:

- Run `backend/seed.py`

---

## Docker

### Dockerfile

`Dockerfile` is a multi-stage build:

1) builds the React app
2) runs Flask via gunicorn, serving the built frontend

The container listens on **port 8000**.

### docker-compose

`docker-compose.yml` starts the app and mounts a named volume to persist the SQLite DB:

- volume mount: `/app/instance`
- recommended production DB URL: `sqlite:////app/instance/portfolio.db`

---

## Troubleshooting

### Frontend shows errors calling `/api/*`
- Ensure backend is running on port **5000**
- Ensure `frontend/package.json` still contains the proxy to `http://localhost:5000`
- If running frontend and backend on different origins, set `REACT_APP_API_URL` and `CORS_ORIGINS`

### CORS errors
- Add the frontend URL to `CORS_ORIGINS` in `.env` (comma-separated)

### Contact form doesn’t send emails
- This is expected unless SMTP is configured.
- Messages are still stored in SQLite.

---

## VS Code tasks

Open the Command Palette → “Tasks: Run Task”, then run:

- `Run All (dev)` — starts backend + frontend
- `Cleanup: Remove artifacts` — removes build/node_modules/venv artifacts (use carefully)

