import { FirebaseSignInErrors, SignInMessages } from "../Utils/firebase-utils";
import "firebase/auth";
import firebase from "firebase/app";

export const signIn = (email: string, password: string): Promise<any> => {
  try {
      const credentials = firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

      return credentials;
  } catch (e: any) {
    if (e.message.includes(FirebaseSignInErrors.EMAIL_BADLY_FORMATTED)) {
      throw new Error(SignInMessages.VALID_EMAIL);
    } else {
      throw new Error(SignInMessages.CHECK_CREDENTIALS);
    }
  }
}

export const signUp = async (email: string, password: string): Promise<any> => {
  try {
      const credentials = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

      return await credentials;
  } catch (e: any) {
    throw e;
  }
}

export const signOut = (): Promise<any> => {
  try {
      const credentials = firebase
      .auth()
      .signOut();

      return credentials;
  } catch (e: any) {
    throw e;
  }
}
