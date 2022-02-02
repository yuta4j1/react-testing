import React from "react";
import {
  ListItem,
  Checkbox,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from "@chakra-ui/react";
import { TodoData } from "../../model";

const ATodo: React.VFC<{ todo: TodoData }> = ({ todo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ListItem>
      <Flex>
        <Checkbox isChecked={todo.done} />
        <Text px="4" onClick={onOpen}>
          {todo.text}
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>testtestTEXTETEXT</ModalContent>
      </Modal>
    </ListItem>
  );
};

export default ATodo;
