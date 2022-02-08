import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { todoAPI } from "../../api/todo";

type TodoType = {
  id: string;
  text: string;
  done: boolean;
};

type TodoStore = {
  todos: TodoType[];
  loading: boolean;
};

const initialState: TodoStore = {
  todos: [],
  loading: false
};

export const fetchTodoList = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    return await todoAPI.todoList();
  }
);

export const tododataSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodoList: (state, action: PayloadAction<TodoType[]>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTodoList.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(fetchTodoList.fulfilled, (state: TodoStore, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
  }
});

export const { updateTodoList } = tododataSlice.actions;

export default tododataSlice.reducer;
