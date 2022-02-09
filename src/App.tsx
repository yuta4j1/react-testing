import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

const App: React.VFC<{}> = ({}) => {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
