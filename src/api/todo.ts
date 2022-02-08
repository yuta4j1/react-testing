import { getRequest } from "./fetcher";
import { TodoData } from "../model";

export const todoAPI = {
  todoList: () => {
    return getRequest<TodoData[]>("/todos");
  }
};
