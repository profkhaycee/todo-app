import { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const handleSave = () => {
    if (!value.trim()) return;
    onEdit(todo.id, value);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="left">
        <div
          className={`dot ${todo.is_completed ? "active" : ""}`}
          onClick={() => onToggle(todo.id)}
        />

        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={todo.is_completed ? "completed" : ""}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <button onClick={handleSave}>💾</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>✏️</button>
        )}

        <button onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default TodoItem;