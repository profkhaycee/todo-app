import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  reorderTodos,
  updateTodo
} from "./services/api";

import Header from "./components/Header";
import ProgressCard from "./components/ProgressCard";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState({});
  const [filter, setFilter] = useState("");

  const fetchTodos = async () => {
    const res = await getTodos(filter);
    setTodos(res.data.data);
    setProgress(res.data.progress);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleAdd = async (title) => {
    try {
      const res = await createTodo({ title });
      setTodos((prev) => [...prev, res.data.data]);
      setProgress(res.data.progress);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleToggle = async (id) => {
    const res = await toggleTodo(id);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? res.data.data : t))
    );
    setProgress(res.data.progress);
  };

 

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);

      // 🔥 Always sync with backend
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id, title) => {
    console.log("Editing", id, title);
    try {
      const res = await updateTodo(id, { title });

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data.data : t))
      );

      setProgress(res.data.progress);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleClear = async () => {
    const res = await clearCompleted();
    setTodos((prev) => prev.filter((t) => !t.is_completed));
    setProgress(res.data.progress);
  };

  const handleReorder = async (reordered) => {
    const updated = reordered.map((r) =>
      todos.find((t) => t.id === r.id)
    );
    setTodos(updated);
    await reorderTodos(reordered);
  };

  return (
    <div className="app">
      <Header />
      <ProgressCard progress={progress} />
      <TodoInput onAdd={handleAdd} />

      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onReorder={handleReorder}
        onEdit={handleEdit}
      />
      

      <div className="filters">
        <button onClick={() => setFilter("")}>View All Tasks</button>
        <button onClick={() => setFilter("active")}>View Active Tasks</button>
        <button onClick={() => setFilter("completed")}>  View Completed Tasks</button>
        <button onClick={handleClear}>Clear Completed Tasks</button>
      </div>
    </div>
  );
}

export default App;