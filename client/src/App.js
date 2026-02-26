import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/todos";

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  return (
    <div className="page">
      <div className="planner-card">
        <h1 className="title">🌈 TO DO LIST ✨</h1>

        <div className="input-section">
          <input
            type="text"
            value={title}
            placeholder="Write something magical..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTodo}>Add 💕</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span
                onClick={() => toggleTodo(todo)}
                className={todo.completed ? "completed" : ""}
              >
                💖 {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo._id)}>⭐</button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="empty-text">No tasks yet 🌸 Add something!</p>
        )}
      </div>
    </div>
  );
}

export default App;