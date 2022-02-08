import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import formDataReducer from "./reducers/formData";
import todoDataReducer from "./reducers/todoData";

const reducers = combineReducers({
  formData: formDataReducer,
  todoData: todoDataReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
