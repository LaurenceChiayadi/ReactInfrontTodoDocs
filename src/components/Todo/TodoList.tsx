import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: stateType) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Todo",
        accessorKey: "todo",
      },
      {
        header: "Completion",
        accessorKey: "isDone",
      },
    ],
    []
  );

  return (
    <>
      <div className="todos">
        {todos.map((todo) => (
          <TodoBar todo={todo} key={todo.id} todos={todos} />
        ))}
      </div>
      <MaterialReactTable
        columns={columns}
        data={todos}
        muiTableBodyRowProps={{ hover: false }}
        onPaginationChange={setPagination}
        state={{ pagination }}
        // enableColumnActions={false}
        // enableColumnFilters={false}
        // enablePagination={false}
        // enableSorting={false}
        // enableBottomToolbar={false}
        // enableTopToolbar={false}
        enableFullScreenToggle={false}
      />
    </>
  );
};

export default TodoList;
