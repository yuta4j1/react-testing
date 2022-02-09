import React, { useState, useMemo, useEffect } from "react";
import { useGetTodoListQuery } from "../fetch/todoData";
import { fetchTodoList } from "../redux/reducers/todoData";
import { useDispatch } from "react-redux";
import {
  Box,
  Center,
  List,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Link
} from "@chakra-ui/react";
import ATodo from "./list-item/ATodo";
import { TodoData } from "../model";
import SearchInput from "../search-input";
import TodoForm from "../todo-form";
import { useNavigate } from "react-router-dom";

const TodoList: React.VFC<{
  searchText: string;
  setSearchText: (v: string) => void;
  todoList: TodoData[];
  modalControl: { isOpen: boolean; onOpen: () => void; onClose: () => void };
}> = ({ searchText, setSearchText, todoList, modalControl }) => {
  let navigate = useNavigate();
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
        <Link
          onClick={() => {
            navigate("/form1");
          }}
        >
          フォーム画面へ遷移
        </Link>
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
  let dispatch = useDispatch();
  // const { data, isError, isLoading } = useGetTodoListQuery();

  useEffect(() => {
    (async () => {
      try {
        const resAction = await dispatch(fetchTodoList()).unwrap();
        console.log("success");
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5432/todos");
        if (res) {
          const data: { todos: TodoData[] } = await res.json();
          setTodos(data.todos);
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
