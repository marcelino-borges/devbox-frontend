import { call, put, all, takeLatest, StrictEffect } from "redux-saga/effects";
import { FileUploadTypes } from "./types";
import * as portfolioService from "./../../services/file-upload-service";
import * as actions from "./actions";

export function* uploadImg({ payload }: any): any {
  const { uploadImg } = portfolioService;
  try {
    const response = yield call(uploadImg, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.uploadImgSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.uploadImgError(error));
  }
}

export function* deleteImg({ payload }: any): any {
  const { deleteImg } = portfolioService;
  try {
    const response = yield call(deleteImg, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.deleteImgSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.uploadImgError(error));
  }
}

export default function* portfolioSagas(): Generator<StrictEffect> {
  yield all([
    takeLatest(FileUploadTypes.UPLOAD_IMG_REQUEST, uploadImg),
    takeLatest(FileUploadTypes.DELETE_IMG_REQUEST, deleteImg),
  ]);
}
