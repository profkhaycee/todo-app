#  Todo API (Laravel Backend)

##  Overview

This is a RESTful Todo API built with Laravel.
It supports task creation, completion tracking, filtering, deletion, and drag-and-drop reordering.

The API is designed to be consumed by a frontend application (e.g., React).

---

##  Base URL


{{base_url}}/api


Example:

```
http://127.0.0.1:8000/api
```

---

## 📦 Response Structure

### ✅ Success Response

```json
{
  "status": "success",
  "message": "Optional message",
  "data": {},
  "meta": {
    "total": 5,
    "completed": 2,
    "progress": "2/5"
  }
}
```

### ❌ Error Response

```json
{
  "status": "error",
  "message": "Error message"
}
```

---

## 📌 Endpoints

---

### 🔹 1. Get Todos

**GET** `/todos`

#### Query Parameters (optional):

| Param  | Value     |
| ------ | --------- |
| filter | active    |
| filter | completed |

#### Example:

```
GET /todos?filter=active
```

#### Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Sample Task",
      "is_completed": false,
      "order": 1
    }
  ],
  "meta": {
    "total": 1,
    "completed": 0,
    "progress": "0/1"
  }
}
```

---

### 🔹 2. Create Todo

**POST** `/todos`

#### Body:

```json
{
  "title": "New Task"
}
```

#### Validation:

* Title is required
* Title must be unique

#### Response:

```json
{
  "status": "success",
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "title": "New Task",
    "is_completed": false,
    "order": 1
  },
  "meta": {
    "total": 1,
    "completed": 0,
    "progress": "0/1"
  }
}
```

---

### 🔹 3. Update Todo

**PUT** `/todos/{id}`

#### Body:

```json
{
  "title": "Updated Task"
}
```

---

### 🔹 4. Delete Todo

**DELETE** `/todos/{id}`

#### Response:

```json
{
  "status": "success",
  "message": "Todo deleted successfully",
  "meta": {
    "total": 0,
    "completed": 0,
    "progress": "0/0"
  }
}
```

---

### 🔹 5. Toggle Todo Completion

**PATCH** `/todos/{id}/toggle`

#### Response:

```json
{
  "status": "success",
  "message": "Todo status updated",
  "data": {
    "id": 1,
    "is_completed": true
  },
  "meta": {
    "total": 1,
    "completed": 1,
    "progress": "1/1"
  }
}
```

---

### 🔹 6. Clear Completed Todos

**DELETE** `/todos/completed`

#### Response:

```json
{
  "status": "success",
  "message": "Completed todos cleared",
  "meta": {
    "total": 0,
    "completed": 0,
    "progress": "0/0"
  }
}
```

---

### 🔹 7. Reorder Todos (Drag & Drop)

**POST** `/todos/reorder`

#### Body:

```json
{
  "todos": [
    { "id": 2, "order": 1 },
    { "id": 1, "order": 2 }
  ]
}
```

#### Response:

```json
{
  "status": "success",
  "message": "Todos reordered successfully"
}
```

---

## ⚠️ Error Handling

### Example: Todo Not Found

```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### Example: Duplicate Title

```json
{
  "status": "error",
  "message": "The title has already been taken."
}
```

---

## 🧠 Notes

* Todos are ordered using the `order` field
* Drag-and-drop is handled via the reorder endpoint
* Progress is returned in all responses via `meta`
* API follows RESTful principles

---

## 🛠️ Tech Stack

* Laravel (Backend API)
* MySQL (Database)
* React (Frontend - separate)

---

## ▶️ Running the Project

```bash
php artisan serve
```

API will be available at:

```
http://127.0.0.1:8000/api
```

---

## 📬 Postman Collection

You can import the provided Postman collection to test all endpoints easily.

---
