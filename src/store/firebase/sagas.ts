import { put, call, takeLatest, StrictEffect, all, take } from "redux-saga/effects";
import { SignInTypes } from "./types";
import * as actions from "./actions";

// export function* signIn({ payload }: any) {
//   const { signIn } = firebaseService;
//   console.log("as");
//   //signIn(payload.email, payload.password);

//   //yield null;

//   yield fetch(signIn(payload.email, payload.password))

//   .then((user) => {
//     put(actions.signInSuccess(user));
//   }).catch(error => put(actions.signInError(error)));

// }

export default function* teamSagas(): Generator<StrictEffect> {
  yield all([
    //takeLatest(SignInTypes.SIGNIN_REQUEST, signIn),
  ]);
}
