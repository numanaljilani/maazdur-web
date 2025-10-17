"use client"
import { persistor, store } from "@/service/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
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
     <Toaster />
    </Provider>
    </PersistGate>
  );
}

export default ReduxWrapper;
