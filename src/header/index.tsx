import React from "react";
import { Box, Heading, Center } from "@chakra-ui/react";

const Header: React.VFC<{}> = ({}) => {
  return (
    <Center px={12} py={16}>
      <Heading>Todo List Demo</Heading>
    </Center>
  );
};

export default Header;
