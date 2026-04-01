import { useState } from "react";

const TodoInput = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="input-group">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write your next task"
      />
      <button onClick={handleSubmit}>+</button>
    </div>
  );
};

export default TodoInput;