# Oracle Cloud Always Free deployment (Docker)

This project runs as **one container**: React is built and served by the Flask backend.

## Overview
- VM: Oracle Cloud Compute (Ubuntu)
- Runtime: Docker
- App port in container: **8000**

## 1) Create the VM
- Use Ubuntu (22.04+ recommended)
- Add your SSH public key
- Note the VM public IP

## 2) Open inbound ports
Minimum:
- TCP **8000** (quickest)

Recommended (better UX):
- TCP **80** and put a reverse proxy (Nginx) in front later

You must open ports in BOTH:
- Oracle VCN security rules (Security List / NSG)
- VM firewall (if enabled)

## 3) Install Docker + Compose
Install Docker Engine and Docker Compose plugin on Ubuntu (official Docker docs).

## 4) Get your code onto the VM
Clone your repo:
- `https://github.com/NuhashMaq/Final_Portfolio.git`

## 5) Configure environment variables
Create a `.env` file ON THE VM (do not commit it). Suggested minimum:
- `SECRET_KEY=...`
- `DATABASE_URL=sqlite:////app/instance/portfolio.db`

Optional (contact form email):
- `SMTP_USERNAME=...`
- `SMTP_PASSWORD=...` (Gmail App Password)
- `CONTACT_TO_EMAIL=...`
- `CONTACT_FROM_EMAIL=...`

## 6) Build + run
From the repo root:
- Use `docker compose up -d --build`

This will:
- Build the React frontend
- Build Python backend
- Start gunicorn on `0.0.0.0:8000`

## 7) Verify
Visit:
- `http://<VM_PUBLIC_IP>:8000/`
- `http://<VM_PUBLIC_IP>:8000/api/health`

## 8) Persistence note (SQLite)
This repo mounts `/app/instance` as a Docker volume (`portfolio_instance`).
That keeps your SQLite DB across restarts/recreates of the container.

## 9) Optional: Nginx + HTTPS
For a nicer URL (no :8000) and HTTPS:
- Install Nginx
- Reverse proxy port 80/443 to `localhost:8000`
- Use Let’s Encrypt (certbot) for free TLS
