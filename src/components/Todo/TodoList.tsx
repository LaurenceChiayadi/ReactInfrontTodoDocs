import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../models/todo";
import store from "../../redux/store";
import { getTodosAsync } from "../../redux/todoSlice";
import TodoBar from "./TodoBar";

interface stateType {
  todos: Todo[];
}

type AppDispatch = typeof store.dispatch;

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: stateType) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className="todos">
      {todos.map((todo) => (
        <TodoBar todo={todo} key={todo.id} todos={todos} />
      ))}
    </div>
  );
};

export default TodoList;
