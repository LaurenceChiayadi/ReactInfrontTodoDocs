import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./Todo.css";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  deleteTodoAsync,
  toggleComplete,
  toggleCompleteAsync,
} from "../../redux/todoSlice";
import AppDispatch from "../../models/appDispatch";

type Props = {
  todo: Todo;
  todos: Todo[];
};

const TodoBar = ({ todo, todos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const dispatch = useDispatch<AppDispatch>();

  const handleDone = () => {
    dispatch(
      toggleCompleteAsync({
        id: todo.id,
        todo: todo.todo,
        isDone: todo.isDone,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteTodoAsync({
        id: todo.id,
        todo: todo.todo,
        isDone: todo.isDone,
      })
    );
  };

  // const handleEdit = (e: React.FormEvent, id: number) => {
  //   e.preventDefault();

  //   setTodos(
  //     todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
  //   );
  //   setEdit(false);
  // };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single">
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon" onClick={() => handleDelete()}>
          {" "}
          <AiFillDelete />{" "}
        </span>
        <span className="icon" onClick={() => handleDone()}>
          {" "}
          <MdDone />{" "}
        </span>
      </div>
    </form>
  );
};

export default TodoBar;
