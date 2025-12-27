# Oracle Cloud Always Free deployment (beginner-friendly)

This project becomes **a normal website online** by running it on a small Linux server (Oracle “Always Free” VM). Your VM will run **one Docker container** that:

- builds the React frontend
- serves it from the Flask backend
- exposes your portfolio on the internet

## What these words mean (super quick)

- **VM**: a computer in the cloud (Ubuntu Linux).
- **Public IP**: the internet address of that VM (like `123.45.67.89`).
- **SSH**: how you “remote login” into the VM from your PC.
- **Port**: a door on the VM (we use **8000** at first).
- **Docker**: runs your app in a clean “box” (container).
- **Environment variables / `.env`**: your secret settings (DB path, email password, etc). Never commit these to GitHub.

## The easiest deployment (recommended first)

We will deploy on **port 8000** first. Later you can add a domain + HTTPS.

### Step 1 — Create the VM (Oracle Cloud)

1. Create a Compute instance (Ubuntu 22.04+).
2. Add an SSH key.
3. Copy these details somewhere:
	- **Public IP address**
	- **Username** (usually `ubuntu`)
	- The **private key file** you downloaded (`.key` / `.pem`)

### Step 2 — Open port 8000 (so the website is reachable)

You must allow inbound TCP **8000** in **two places**:

1) Oracle networking rules (VCN Security List / NSG)
- Allow inbound: TCP, destination port range: `8000`

2) VM firewall (Ubuntu)
- If UFW is enabled on the VM, allow `8000`.

If you skip this step, the site can run but nobody can access it.

### Step 3 — SSH into the VM (from your Windows PC)

Open PowerShell on your PC and SSH in.

Typical command pattern:
- `ssh -i "C:\path\to\your\key.pem" ubuntu@<VM_PUBLIC_IP>`

If SSH fails, the most common reasons are:
- wrong username (try `ubuntu`)
- wrong key file
- VM not fully provisioned yet

### Step 4 — Install Docker on the VM

On the VM (inside SSH), install Docker Engine + Docker Compose plugin.

Oracle docs vary slightly by Ubuntu version, so the safest approach is:
- follow Docker’s official Ubuntu installation instructions

After install, verify:
- `docker --version`
- `docker compose version`

### Step 5 — Download your project code onto the VM

On the VM:

1. Install git (if missing):
	- `sudo apt-get update`
	- `sudo apt-get install -y git`
2. Clone your repo:
	- `git clone https://github.com/NuhashMaq/Final_Portfolio.git`
3. Go into it:
	- `cd Final_Portfolio`

### Step 6 — Create the production `.env` file ON the VM

In the repo root on the VM, create a `.env` file. Minimum:

- `SECRET_KEY=make-a-long-random-string`
- `DATABASE_URL=sqlite:////app/instance/portfolio.db`

Optional (contact form email):

- `SMTP_USERNAME=your_gmail@gmail.com`
- `SMTP_PASSWORD=your_gmail_app_password`
- `CONTACT_TO_EMAIL=mashfiq.cse.ruet@gmail.com`
- `CONTACT_FROM_EMAIL=your_gmail@gmail.com`

Important:
- This `.env` stays on the VM only.
- Never upload it to GitHub.

### Step 7 — Build and run the website with Docker Compose

From the repo root on the VM:

- `docker compose up -d --build`

This uses `docker-compose.yml` which:
- builds the image (React + Flask)
- runs gunicorn on `0.0.0.0:8000`
- creates a persistent volume so your SQLite DB does not disappear

### Step 8 — Verify it works

From your own browser:

- `http://<VM_PUBLIC_IP>:8000/`
- `http://<VM_PUBLIC_IP>:8000/api/health`

If it doesn’t load:
- re-check port 8000 is open in Oracle rules + VM firewall
- check container logs: `docker compose logs -n 200 --no-color`

## Persistence note (SQLite)

SQLite is stored in `/app/instance/portfolio.db` inside the container.
This setup mounts `/app/instance` to a Docker volume so your DB survives restarts.

## Optional upgrade later: domain + HTTPS

To get rid of `:8000` and enable HTTPS:

1. Run Nginx on the VM (port 80/443).
2. Reverse proxy to `http://127.0.0.1:8000`.
3. Use Let’s Encrypt (certbot) for a free TLS certificate.
