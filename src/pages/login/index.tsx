import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, CircularProgress } from "@material-ui/core";
import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import { SignInMessages } from "../../Utils/firebase-utils";
import LightTextfield from "./../../components/shared/textfield-light/index";

import { IApplicationState } from "../../store/root-reducer";
import { signIn } from "../../services/firebase-service";
import {
  setAuthenticatedUser,
  signInError,
  signInLoading,
} from "../../store/firebase/actions";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import firebase from "firebase";
import { IFirebaseUser } from "../../store/firebase/types";

const PageLogin = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state: IApplicationState) => state.user);

  const { register, handleSubmit, reset } = useForm();
  const [showLoginError, setShowLoginError] = useState<boolean>(false);
  const [textLoginError, setTextLoginError] = useState<string>("");
  const [redirectToDashboard, setRedirectToDashboard] =
    useState<boolean>(false);

  const buttonStyle = {
    backgroundColor: THEME_RED,
  };

  const onSubmit = async (data: any) => {
    clearErrors();
    const email = data.email;
    const password = data.password;

    signInWithFirebase(email, password);
    reset();
  };

  const signInWithFirebase = async (email: string, password: string) => {
    signIn(email, password)
      .then((response) => {
        dispatch(signInLoading());
        dispatch(setAuthenticatedUser(response.user));
      })
      .catch((_) => {
        dispatch(signInError(SignInMessages.CHECK_CREDENTIALS));
      });
  };

  const clearErrors = () => {
    setLoginError("");
    setShowLoginError(false);
  };

  const setLoginError = (msg: string) => {
    setTextLoginError(msg);
    setShowLoginError(true);
  };

  useEffect(() => {
    const firebaseCurrentUser: firebase.User | null =
      firebase.auth().currentUser;

    if (!!firebaseCurrentUser && firebaseCurrentUser !== null) {
      const user: IFirebaseUser = {
        email: firebaseCurrentUser.email || "",
        displayName: firebaseCurrentUser.displayName,
        phoneNumber: firebaseCurrentUser.phoneNumber,
        photoURL: firebaseCurrentUser.photoURL,
        refreshToken: firebaseCurrentUser.refreshToken,
        uid: firebaseCurrentUser.uid,
        emailVerified: firebaseCurrentUser.emailVerified,
        isAnonymous: firebaseCurrentUser.isAnonymous,
      };

      dispatch(setAuthenticatedUser(user));
      setRedirectToDashboard(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!userState.error && userState.error.length > 0) {
      setLoginError(userState.error);
    }
  }, [userState.error]);

  useEffect(() => {
    if (
      !!userState.user &&
      !!userState.user.email &&
      userState.user.email.length > 0
    ) {
      setRedirectToDashboard(true);
    }
  }, [history, userState.user]);

  return (
    <div className="section loginPage">
      {redirectToDashboard && <Redirect from="/login" to="/dashboard" />}
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container justifyContent="center" className="formContainer">
          <Grid item container justifyContent="center">
            <h1>Sign In</h1>
          </Grid>
          {showLoginError && (
            <Grid item container justifyContent="flex-start">
              <div style={{ color: "red" }}>* {textLoginError}</div>
            </Grid>
          )}
          <Grid item container style={{ margin: "25px" }}></Grid>
          {userState.loading ? (
            <CircularProgress
              style={{
                color: THEME_RED,
              }}
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item container justifyContent="center">
                <LightTextfield
                  required
                  label="Email"
                  register={register("email")}
                  id="login-field"
                />
                <div style={{ margin: "25px" }}></div>
                <LightTextfield
                  required
                  type="password"
                  label="Password"
                  register={register("password")}
                  id="login-field"
                />
              </Grid>
              <Grid container item justifyContent="center">
                <Button
                  className="submitButton"
                  style={buttonStyle}
                  type="submit"
                >
                  LOGIN
                </Button>
              </Grid>
            </form>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default PageLogin;
