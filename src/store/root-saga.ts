import { all, fork, StrictEffect } from "redux-saga/effects";

import portfolio from "./portfolio/sagas";
import team from "./team/sagas";
import user from "./firebase/sagas";
import file from "./file-upload/sagas";

export default function* rootSaga(): Generator<StrictEffect> {
  return yield all([
    fork(portfolio),
    fork(team),
    fork(user),
    fork(file),
  ]);
}
