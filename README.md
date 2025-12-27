# ClickUpProject (Portfolio)

Full‑stack portfolio website:
- **Frontend:** React (Create React App)
- **Backend:** Python Flask + SQLAlchemy (SQLite)

This repo is set up so the **Flask backend can serve the React production build** (single origin). For production you should run Flask with **gunicorn**.

## Run locally

### 1) Backend
- Create venv and install deps (first time)
- Seed sample data
- Start server

### 2) Frontend
- Install deps (first time)
- Start dev server

You can also run the VS Code build task **Run All (dev)**.

## Run in “production mode” locally (single server)

1) Build the frontend:
- In `frontend/`, run the React production build (creates `frontend/build`).

2) Run the backend:
- Start Flask (or gunicorn) from the `backend` app. When `frontend/build/index.html` exists, Flask will serve the SPA and keep `/api/*` routes working.

## Docker (recommended for deployment)

This repo includes a multi-stage `Dockerfile` that:
- builds the React app
- runs the Flask backend with gunicorn

The container listens on port **8000**.

## Environment variables
- Backend uses root `.env` (ignored by git). See `.env.example`.
- Frontend can use `frontend/.env` (ignored). See `frontend/.env.example`.

### Backend env vars (important for deployment)
- `SECRET_KEY`
- `DATABASE_URL`
- (optional for contact email) `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

## Deployment (Option B): Oracle Cloud “Always Free” VM + Docker

Oracle’s “Always Free” Compute is the closest thing to a free 24/7 server. It may require payment-card verification.

### 1) Create the VM
1. Create an Oracle Cloud account.
2. Create a **Compute Instance** (Ubuntu).
3. Download the SSH private key (or use your own key) and note the public IP.

### 2) Open firewall ports
You need inbound access to at least:
- TCP **80** (recommended) or TCP **8000** (if you don’t add a reverse proxy)

Also open the same port(s) in:
- Oracle VCN Security List / Network Security Group
- Ubuntu firewall (if enabled)

### 3) Install Docker on the VM
SSH into the VM, then install Docker (follow Docker’s official docs for Ubuntu).

### 4) Get the code onto the VM
Option A: `git clone` your GitHub repo.

### 5) Build the Docker image
From the repo root (where `Dockerfile` is):
- Build the image.

### 6) Run the container
Run with env vars and a persistent volume for SQLite.

SQLite persistence note:
- If you run SQLite **inside the container** without a volume, the DB is lost when the container is recreated.
- For persistence, mount a host directory as a volume and point `DATABASE_URL` there.

Suggested production settings:
- `DATABASE_URL=sqlite:////app/instance/portfolio.db`
- Mount a host folder to `/app/instance`

### 7) Keep it running
Use one of:
- Docker restart policy (`--restart unless-stopped`)
- systemd service that runs your docker container on boot

### 8) Domain + HTTPS (optional)
For HTTPS, you typically add Nginx + Let’s Encrypt (still free) or use Cloudflare in front.
