"use client"
import { persistor, store } from "@/service/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

function ReduxWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
    </PersistGate>
  );
}

export default ReduxWrapper;
