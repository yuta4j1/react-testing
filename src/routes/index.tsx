import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "../pages/todo";
import Form1 from "../pages/form1";
import Form2 from "../pages/form2";
import Confirm from "../pages/confirm";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Root = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/confirm" element={<Confirm />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default Root;
