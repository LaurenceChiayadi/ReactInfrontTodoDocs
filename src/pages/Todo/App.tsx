import React, { useState } from "react";
import "./App.css";
import InputField from "../../components/Input/InputField";
import TodoList from "../../components/Todo/TodoList";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../redux/todoSlice";
import AppDispatch from "../../models/appDispatch";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      dispatch(addTodoAsync(todo));
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default App;
