import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import "./TodoApp.css";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const todosFromStorage = localStorage.getItem("todos");
    if (todosFromStorage) {
      setTodos(JSON.parse(todosFromStorage));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className={`app ${theme}`}>
      <div className={`container ${theme}`}>
        <h1>Lista de Tarefas</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Adicionar Tarefa</button>
        </div>
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>Remover</button>
            </li>
          ))}
        </ol>
        <button onClick={toggleTheme}>
          Alternar para Tema {theme === "light" ? "Escuro" : "Claro"}
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
