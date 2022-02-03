import React from "react";
import Header from "../header";
import TodoList from "../todo-list";

const TodoPage: React.VFC<{}> = ({}) => {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
};

export default TodoPage;
