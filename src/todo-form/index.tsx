import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postRequest } from "../api";

const TodoForm: React.VFC<{ title: string }> = ({ title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubmit = async (data: Object) => {
    return await postRequest<{ text: string; done: boolean }, any>("/todos", {
      text: (data as { todo: string }).todo,
      done: false
    });
  };
  return (
    <Box mx="12" my="8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel htmlFor="todo">タスクを入力してください。</FormLabel>
          <Input
            id="todo"
            placeholder="洗い物をする"
            {...register("todo", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" }
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" mt="4" isLoading={isSubmitting}>
          リストに追加
        </Button>
      </form>
    </Box>
  );
};

export default TodoForm;
