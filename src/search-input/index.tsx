import React from "react";
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchInput: React.VFC<{
  text: string;
  setText: (v: string) => void;
}> = ({ text, setText }) => {
  return (
    <Center>
      <Box py={10}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="絞り込み検索"
            w={"20rem"}
            value={text}
            onChange={e => setText(e.currentTarget.value)}
          />
        </InputGroup>
      </Box>
    </Center>
  );
};

export default SearchInput;
