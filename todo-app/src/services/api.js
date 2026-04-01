

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getTodos = (filter = "") =>
  API.get(`/todos${filter ? `?filter=${filter}` : ""}`);

export const createTodo = (data) => API.post("/todos", data);

export const toggleTodo = (id) => API.patch(`/todos/${id}/toggle`);

export const deleteTodo = (id) => API.delete(`/todos/${id}`);

export const clearCompleted = () => API.delete(`/todos/completed`);

export const reorderTodos = (todos) => API.post("/todos/reorder", { todos });

export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
