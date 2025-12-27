# Multi-stage build:
# 1) Build React frontend
# 2) Run Flask backend (serving the built frontend)

FROM node:20-alpine AS frontend
WORKDIR /app/frontend

# Install deps first for better caching
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Build
COPY frontend/ ./
RUN npm run build


FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install Python deps
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ backend/

# Copy built frontend into the expected location
COPY --from=frontend /app/frontend/build /app/frontend/build

# Optional: create instance directory if needed by your Flask app
RUN mkdir -p /app/instance

# Render/Railway/Fly will route to this port
EXPOSE 8000

# Use --chdir so backend imports like "from config import ..." work as-is
CMD ["gunicorn", "--chdir", "backend", "-b", "0.0.0.0:8000", "app:create_app()"]
