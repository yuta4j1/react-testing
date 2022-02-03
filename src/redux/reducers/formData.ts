import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormdataType = {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
};

const initialState: FormdataType = {
  firstName: "",
  lastName: "",
  age: 0,
  phoneNumber: ""
};

export const formdataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    form1Update: (
      state,
      action: PayloadAction<Pick<FormdataType, "firstName" | "lastName">>
    ) => {
      console.log("action", action);
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { form1Update } = formdataSlice.actions;

export default formdataSlice.reducer;
