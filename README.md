# Todo App — Docker Setup Guide

> A full-stack Todo application built with **React**, **Laravel**, and **MySQL** — fully containerized with Docker.

---

## 📦 Services

| Service  | Technology        | URL                          |
|----------|-------------------|------------------------------|
| Frontend | React             | http://localhost:3000        |
| Backend  | Laravel (PHP 8.3) | http://localhost:8000        |
| Database | MySQL 8           | localhost:3307               |

---

## 📁 Project Structure

```
todo-project/
├── todo-app/               ← React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── todo-api/               ← Laravel backend
│   ├── Dockerfile
│   ├── composer.json
│   └── ...
└── docker-compose.yml      ← Orchestrates all services
```

---

You can find the docker documentation at /DOCKER-DOCS.md

You can also find the API documentation at /todo-api/API-DOCS.md

