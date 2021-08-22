import { call, put, all, takeLatest, StrictEffect } from "redux-saga/effects";
import { LogTypes } from "./types";
import * as logsService from "./../../services/logs-service";
import * as actions from "./actions";

export function* getAllLogs(): any {
  const { getAllLogs } = logsService;
  try {
    const response = yield call(getAllLogs);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.getAllLogsSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.getAllLogsError(error));
  }
}

export function* getLogsByType({ payload }: any): any {
  const { getLogsByType } = logsService;
  try {
    const response = yield call(getLogsByType, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.getLogsByTypeSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.getLogsByTypeError(error));
  }
}

export function* createLog({ payload }: any): any {
  const { createLog } = logsService;
  try {
    const response = yield call(createLog, payload);
    console.log("payload: ", payload);
    console.log("response: ", response);
    if(response &&
      (response.status === 200 ||
      response.status === 201) &&
      response.data.status !== "error") {
        yield put(actions.createLogSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.createLogError(error));
  }
}

export function* updateLog({ payload }: any): any {
  const { updateLog } = logsService;
  try {
    const response = yield call(updateLog, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.updateLogSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.updateLogError(error));
  }
}

export function* deleteLog({ payload }: any): any {
  const { deleteLog } = logsService;
  try {
    const response = yield call(deleteLog, payload._id);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.deleteLogSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.deleteLogError(error));
  }
}

export default function* portfolioSagas(): Generator<StrictEffect> {
  yield all([
    takeLatest(LogTypes.GET_ALL_LOGS_REQUEST, getAllLogs),
    takeLatest(LogTypes.GET_LOGS_BY_TYPE_REQUEST, getLogsByType),
    takeLatest(LogTypes.CREATE_LOG_REQUEST, createLog),
    takeLatest(LogTypes.UPDATE_LOG_REQUEST, updateLog),
    takeLatest(LogTypes.DELETE_LOG_REQUEST, deleteLog),
  ]);
}
