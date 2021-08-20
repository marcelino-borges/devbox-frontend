/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const ToastConfigured = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  );
};

export default ToastConfigured;
