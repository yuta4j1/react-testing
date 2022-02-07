import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  Stack,
  CheckboxGroup,
  Checkbox
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { form2Update } from "../redux/reducers/formData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

type Form2DataType = {
  age: number;
  phoneNumber: string;
  isDuelist: boolean;
};

type Form2DispType = {
  age: string;
  phoneNumber: string;
  isDuelist: string;
  deckType: string[];
};

export const Form2: React.VFC<{
  updateAction: (data: Form2DataType) => void;
  moveToConfirm: () => void;
}> = ({ updateAction, moveToConfirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Form2DispType>();
  const onSubmit = (data: Form2DispType) => {
    const d: Form2DataType = {
      age: Number(data.age),
      phoneNumber: data.phoneNumber,
      isDuelist: data.isDuelist === "1"
    };
    // ここでデータ変換する
    console.log(data);
    updateAction(d);
    moveToConfirm();
  };

  console.log("errors", errors);

  const isDuelist = watch("isDuelist");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.age}>
          <FormLabel htmlFor="age">年齢</FormLabel>
          <Input
            id="age"
            {...register("age", {
              required: { value: true, message: "年齢は必須入力です。" },
              maxLength: {
                value: 3,
                message: "3桁以下の数値を入力してください。"
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "数値で入力してください。"
              }
            })}
          />
          {errors.age && (
            <FormErrorMessage>{errors.age.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.phoneNumber}>
          <FormLabel htmlFor="phoneNumber">電話番号</FormLabel>
          <Input
            id="phoneNumber"
            {...register("phoneNumber", {
              required: { value: true, message: "電話番号は必須入力です。" },
              minLength: {
                value: 5,
                message: "電話番号は5文字以上で入力してください。"
              }
            })}
          />
          {errors.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.isDuelist}>
          <FormLabel as="legend">あなたは決闘者（デュエリスト）か？</FormLabel>
          <RadioGroup>
            <Stack direction="row">
              <Radio
                value="1"
                {...register("isDuelist", {
                  required: true
                })}
              >
                はい
              </Radio>
              <Radio
                value="2"
                {...register("isDuelist", {
                  required: true
                })}
              >
                いいえ
              </Radio>
            </Stack>
          </RadioGroup>
          {errors.isDuelist && errors.isDuelist.type === "required" && (
            <FormErrorMessage>白黒はっきりしてください。</FormErrorMessage>
          )}
          <FormHelperText>Select only if you're a fan.</FormHelperText>
        </FormControl>
        {isDuelist === "1" && (
          <FormControl isInvalid={!!errors.deckType}>
            <FormLabel as="legend">
              あなたの使用デッキを教えてください。
            </FormLabel>
            <Stack spacing={5}>
              <CheckboxGroup>
                <Checkbox
                  {...register("deckType", {
                    required: {
                      value: true,
                      message: "どれか一つは持ってるやろ？"
                    }
                  })}
                  value="blackDevil"
                >
                  暗黒界
                </Checkbox>
                <Checkbox
                  {...register("deckType", {
                    required: {
                      value: true,
                      message: "どれか一つは持ってるやろ？"
                    }
                  })}
                  value="arean"
                >
                  エーリアン
                </Checkbox>
                <Checkbox
                  {...register("deckType", {
                    required: {
                      value: true,
                      message: "どれか一つは持ってるやろ？"
                    }
                  })}
                  value="kagebusyou"
                >
                  影六武衆
                </Checkbox>
                <Checkbox
                  {...register("deckType", {
                    required: {
                      value: true,
                      message: "どれか一つは持ってるやろ？"
                    }
                  })}
                  value="sinkai"
                >
                  深海
                </Checkbox>
                <Checkbox
                  {...register("deckType", {
                    required: {
                      value: true,
                      message: "どれか一つは持ってるやろ？"
                    }
                  })}
                  value="cyber"
                >
                  サイバー
                </Checkbox>
              </CheckboxGroup>
            </Stack>
            {errors.deckType && (
              <FormErrorMessage>{errors.deckType}</FormErrorMessage>
            )}
            <FormHelperText>Select only if you're a fan.</FormHelperText>
          </FormControl>
        )}
        <Input type="submit" value="次の画面へ" />
      </form>
    </div>
  );
};

const Form2Container: React.VFC<{}> = ({}) => {
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const updateAction = (data: Form2DataType) => dispatch(form2Update(data));
  return (
    <Form2
      updateAction={updateAction}
      moveToConfirm={() => navigate("/confirm")}
    />
  );
};

export default Form2Container;
