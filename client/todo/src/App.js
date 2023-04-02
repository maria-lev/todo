import React, { useState, useEffect } from "react";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api/todos.api";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loadTodo = async () => {
      const todosResponse = await getAllTodos();
      setTodos(todosResponse);
    };

    void loadTodo();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    const newTodo = { title: inputValue.trim(), completed: false };

    createTodo(newTodo).then((createdTodo) => {
      setTodos([...todos, createdTodo]);
      setInputValue("");
    });
  };

  const handleTodoDelete = (id) => {
    deleteTodo(id).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  const handleTodoToggle = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(id, updatedTodo).then((updatedTodo) => {
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoToggle(todo.id)}
            />
            <span
              style={{
                titleDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
