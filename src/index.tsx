import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import dotenv from "dotenv";
import store from "./store";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4dqXV0crTe5yQBpfFLuRwJOO9bIG5D7w",
  authDomain: "devbox-d3061.firebaseapp.com",
  projectId: "devbox-d3061",
  storageBucket: "devbox-d3061.appspot.com",
  messagingSenderId: "932693866800",
  appId: "1:932693866800:web:c772e9f44e85263be1f0f5",
  measurementId: "G-39FNH6N22X",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
