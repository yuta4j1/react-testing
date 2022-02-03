import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "../pages/todo";
import Form1 from "../pages/form1";
import Form2 from "../pages/form2";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/form1" element={<Form1 />} />
          <Route path="/form2" element={<Form2 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
