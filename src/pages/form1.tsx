import React from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { form1Update } from "../redux/reducers/formData";
import { useDispatch } from "react-redux";

type Form1DataType = {
  firstName: string;
  lastName: string;
};

const Form1: React.VFC<{
  updateAction: (data: Form1DataType) => void;
}> = ({ updateAction }) => {
  const { register, handleSubmit } = useForm<Form1DataType>();
  let navigate = useNavigate();
  const onSubmit = (data: Form1DataType) => {
    console.log(data);
    updateAction(data);
    navigate("/form2");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel htmlFor="firstname">FirstName</FormLabel>
          <Input id="firstname" {...register("firstName")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastname">FirstName</FormLabel>
          <Input id="lastname" {...register("lastName")} />
        </FormControl>
        <Button type="submit">次の画面へ</Button>
      </form>
    </div>
  );
};

const Form1Container: React.VFC<{}> = ({}) => {
  const dispatch = useDispatch();
  const updateAction = (data: Form1DataType) => dispatch(form1Update(data));
  return <Form1 updateAction={updateAction} />;
};

export default Form1Container;
