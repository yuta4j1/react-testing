import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Center,
  List,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from "@chakra-ui/react";
import ATodo from "./list-item/ATodo";
import { TodoData } from "../model";
import SearchInput from "../search-input";
import TodoForm from "../todo-form";

const TodoList: React.VFC<{
  searchText: string;
  setSearchText: (v: string) => void;
  todoList: TodoData[];
  modalControl: { isOpen: boolean; onOpen: () => void; onClose: () => void };
}> = ({ searchText, setSearchText, todoList, modalControl }) => {
  return (
    <Box>
      <Center>
        <Button
          bg="teal.300"
          color="white"
          onClick={modalControl.onOpen}
          fontSize={"sm"}
        >
          タスクを追加する
        </Button>
      </Center>
      <SearchInput text={searchText} setText={setSearchText} />
      <Center>
        <List spacing={3}>
          {todoList.map((v, i) => (
            <ATodo key={i} todo={v} />
          ))}
        </List>
      </Center>
      <Modal isOpen={modalControl.isOpen} onClose={modalControl.onClose}>
        <ModalOverlay />
        <ModalContent>
          <TodoForm title="test" />
        </ModalContent>
      </Modal>
    </Box>
  );
};

const TodoListContainer: React.VFC<{}> = ({}) => {
  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState<TodoData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5432/todos");
        if (res) {
          const datas: TodoData[] = await res.json();
          setTodos(datas);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const todoList = useMemo(() => {
    return todos.filter(v => v.text.indexOf(searchText) !== -1);
  }, [todos, searchText]);

  return (
    <TodoList
      searchText={searchText}
      setSearchText={setSearchText}
      todoList={todoList}
      modalControl={{
        isOpen,
        onOpen,
        onClose
      }}
    />
  );
};

export default TodoListContainer;
