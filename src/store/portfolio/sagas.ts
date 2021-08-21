import { call, put, all, takeLatest, StrictEffect } from "redux-saga/effects";
import { PortfolioTypes } from "./types";
import * as portfolioService from "./../../services/portfolio-service";
import * as actions from "./actions";

export function* getCompletePortfolio(): any {
  const { getPortfolio } = portfolioService;
  try {
    const response = yield call(getPortfolio);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.getCompletePortfolioSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.getCompletePortfolioError(error));
  }
}

export function* createPortfolio({ payload }: any): any {
  const { createPortfolio } = portfolioService;
  try {
    const response = yield call(createPortfolio, payload);
    console.log("payload: ", payload);
    console.log("response: ", response);
    if(response &&
      (response.status === 200 ||
      response.status === 201) &&
      response.data.status !== "error") {
        yield put(actions.createPortfolioSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.createPortfolioError(error));
  }
}

export function* updatePortfolio({ payload }: any): any {
  const { updatePortfolio } = portfolioService;
  try {
    const response = yield call(updatePortfolio, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.updatePortfolioSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.updatePortfolioError(error));
  }
}

export function* deletePortfolio({ payload }: any): any {
  const { deletePortfolio } = portfolioService;
  try {
    const response = yield call(deletePortfolio, payload._id, payload.email);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.deletePortfolioSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.deletePortfolioError(error));
  }
}

export default function* portfolioSagas(): Generator<StrictEffect> {
  yield all([
    takeLatest(PortfolioTypes.GET_COMPLETE_PORTFOLIO_REQUEST, getCompletePortfolio),
    takeLatest(PortfolioTypes.CREATE_PORTFOLIO_REQUEST, createPortfolio),
    takeLatest(PortfolioTypes.UPDATE_PORTFOLIO_REQUEST, updatePortfolio),
    takeLatest(PortfolioTypes.DELETE_PORTFOLIO_REQUEST, deletePortfolio),
  ]);
}
