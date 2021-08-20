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

export default function* portfolioSagas(): Generator<StrictEffect> {
  yield all([
    takeLatest(PortfolioTypes.GET_COMPLETE_PORTFOLIO_REQUEST, getCompletePortfolio),
  ]);
}
