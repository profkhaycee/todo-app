# Todo App — Docker Setup Guide

## ⚙️ Environment Setup

Before building the containers, create a Laravel `.env` file  ensure the database section looks like this:

```env
DB_CONNECTION=mysql
DB_HOST=db        # Must be 'db' — the Docker MySQL service name
DB_PORT=3306
DB_DATABASE=todo
DB_USERNAME=test
DB_PASSWORD=test
DB_SOCKET=        # Must be empty — do NOT use a local MAMP/XAMPP socket path
```

> ⚠️ If you previously used MAMP or XAMPP locally, `DB_SOCKET` may contain a path like `/Applications/MAMP/tmp/mysql/mysql.sock` — **clear this field completely**.

---

## 🚀 Building & Running the Application

### Step 1 — Clone the Repository

```bash
git clone https://github.com/profkhaycee/todo-app.git
cd todo-app
```

### Step 2 — Build and Start All Services

Run this command from the project root (where `docker-compose.yml` lives):

```bash
docker-compose up --build
```

This single command will:
- Build the React frontend container and start the development server
- Build the Laravel backend container and install all Composer dependencies
- Pull and start the MySQL 8 database container
- Connect all three services on a shared Docker network

> ⏱️ The first build takes **3–5 minutes** as Docker downloads base images and installs dependencies. Subsequent runs (without `--build`) will be significantly faster.

### Step 3 — Run Database Migrations *(First Time Only)*

Once all containers are running, open a **new terminal window** and run:

```bash
docker-compose exec backend php artisan migrate
```

If prompted with *"Do you want to run this command in production?"*, type `yes` and press Enter.

### Step 4 — Access the Application

| Service        | URL                              |
|----------------|----------------------------------|
| Frontend       | http://localhost:3000            |
| Backend API    | http://localhost:8000/api/todos  |
| MySQL Database | localhost:3307                   |

---

## 🛠️ Useful Docker Commands

| Command                                      | Description                                      |
|----------------------------------------------|--------------------------------------------------|
| `docker-compose up --build`                  | Build images and start all containers            |
| `docker-compose up`                          | Start containers (skips rebuild, faster)         |
| `docker-compose down`                        | Stop and remove all containers                   |
| `docker-compose down -v`                     | Stop containers and delete database volume       |
| `docker-compose logs backend`                | View Laravel backend logs                        |
| `docker-compose logs frontend`               | View React frontend logs                         |
| `docker-compose logs -f`                     | Follow live logs from all services               |
| `docker-compose exec backend bash`           | Open a terminal inside the Laravel container     |
| `docker-compose exec db mysql -u test -p`    | Connect to MySQL inside the container            |
| `docker-compose ps`                          | List all running containers and their status     |

---

## 🔧 Troubleshooting

### Frontend shows blank page or 404
- Ensure Docker Desktop is running and the frontend container started successfully
- Run `docker-compose logs frontend` and look for compilation errors
- Try `docker-compose down` then `docker-compose up --build` for a fresh rebuild

### Backend returns database connection error
- Confirm `DB_HOST=db` and `DB_SOCKET=` (empty) in `todo-api/.env`
- The `db` container may still be initializing — wait 10–15 seconds and retry
- Run `docker-compose logs db` to check if MySQL started successfully

### Port already in use
- Another process on your machine is using port `3000`, `8000`, or `3307`
- Stop the conflicting process, or change the port mapping in `docker-compose.yml`:

```yaml
# Example: change frontend port from 3000 to 3001
ports:
  - "3001:3000"
```

### Changes not reflecting after code edits
The volumes in `docker-compose.yml` mount your local code into the containers, so most changes hot-reload automatically. If they don't:

```bash
docker-compose down && docker-compose up --build
```

---

## 🐳 Docker Compose Services Reference

| Service    | Description                                  |
|------------|----------------------------------------------|
| `frontend` | React app — built from `./todo-app/Dockerfile`  |
| `backend`  | Laravel API — built from `./todo-api/Dockerfile` |
| `db`       | MySQL 8 — official Docker Hub image          |

All three services communicate over an internal Docker network. The frontend calls the backend API at `http://localhost:8000/api` from the browser, while internal service-to-service communication uses the Docker service name (e.g. `db` as the MySQL host).
