import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { webAPI } from "../constants/constant";
import { Todo } from "../models/todo";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch(webAPI.todoUrl);
    if (response.ok) {
      return (await response.json()) as Todo[];
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload: string) => {
    const response = await fetch(webAPI.todoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: payload }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload: Todo) => {
    const response = await fetch(`${webAPI.todoUrl}/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !payload.isDone }),
    });

    if (response.ok) {
      const todo: Todo = await response.json();
      return { id: payload.id, isDone: payload.isDone };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload: Todo) => {
    const response = await fetch(`${webAPI.todoUrl}/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const todo = await response.json();
      console.log(todo);
      return todo;
    }
  }
);

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        todo: action.payload.title,
        isDone: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].isDone = !action.payload.isDone;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state, { payload }) => {
      console.log("fetching data...");
    });
    builder.addCase(getTodosAsync.fulfilled, (state, { payload }) => {
      console.log("fetched data successfully!");
      return payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload?.todo);
    });
    builder.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload?.id);
      state[index].isDone = !action.payload?.isDone;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload?.id);
      state.splice(index, 1);
    });
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
