import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import TodoList from "./todo-list";
import Header from "./header";

const App: React.VFC<{}> = ({}) => {
  return (
    <ChakraProvider>
      <Header />
      <TodoList />
    </ChakraProvider>
  );
};

export default App;
