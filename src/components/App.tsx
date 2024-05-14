import AddTodo from "./AddTodo"
import Peoples from "./Peoples/Peoples"
import Planets from "./Planets/Planets"
import TodoList from "./TodoList"

function App() {
  return (
    <div>

      <div>
        <Peoples />
        <hr />
        <Planets />
      </div>

      <h1>Todo App</h1>
      <TodoList />

      <AddTodo />
    </div>
  )
}

export default App
