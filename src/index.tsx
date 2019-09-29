import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

type FromElem = React.FormEvent<HTMLFormElement>;

interface ITtodo {
  text: string;
  complete: boolean;
}
export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITtodo[]>([]);

  const handleSubmit = (e: FromElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITtodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITtodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITtodo, index: number) => (
          <Fragment>
            <div>{todo.text}</div>
            <button type="button" onClick={() => completeTodo(index)}>
              {" "}
              {todo.complete ? "Incomplete" : "Complete"}{' '}
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
