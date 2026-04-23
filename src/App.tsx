import { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  const completed = todos.filter(t => t.completed).length

  return (
    <div className="container">
      <div className="todo-app">
        <h1>✓ Todo App</h1>

        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">Add</button>
        </div>

        <div className="stats">
          <span>{completed} of {todos.length} completed</span>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one to get started! 🚀</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn"
                  aria-label="Delete todo"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
