import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import TodoList from "./todo-list";
import Header from "./header";
import Routes from "./routes";

const App: React.VFC<{}> = ({}) => {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
