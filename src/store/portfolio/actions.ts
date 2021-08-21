import { action } from "typesafe-actions";
import { IPortfolioItem, PortfolioTypes } from "./types";

export const getCompletePortfolioRequest = (): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_REQUEST);
export const getCompletePortfolioSuccess = (payload: any): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_SUCCESS, payload);
export const getCompletePortfolioError = (payload: any): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_ERROR, payload);

export const createPortfolioRequest = (payload: IPortfolioItem): any => action(PortfolioTypes.CREATE_PORTFOLIO_REQUEST, payload);
export const createPortfolioSuccess = (payload: any): any => action(PortfolioTypes.CREATE_PORTFOLIO_SUCCESS, payload);
export const createPortfolioError = (payload: any): any => action(PortfolioTypes.CREATE_PORTFOLIO_ERROR, payload);

export const updatePortfolioRequest = (payload: IPortfolioItem): any => action(PortfolioTypes.UPDATE_PORTFOLIO_REQUEST, payload);
export const updatePortfolioSuccess = (payload: any): any => action(PortfolioTypes.UPDATE_PORTFOLIO_SUCCESS, payload);
export const updatePortfolioError = (payload: any): any => action(PortfolioTypes.UPDATE_PORTFOLIO_ERROR, payload);

export const deletePortfolioRequest = (payload: IPortfolioItem): any => action(PortfolioTypes.DELETE_PORTFOLIO_REQUEST, payload);
export const deletePortfolioSuccess = (payload: any): any => action(PortfolioTypes.DELETE_PORTFOLIO_SUCCESS, payload);
export const deletePortfolioError = (payload: any): any => action(PortfolioTypes.DELETE_PORTFOLIO_ERROR, payload);

export const setShowFailToast = (payload: string | undefined): any => action(PortfolioTypes.SHOW_FAIL_TOAST, payload);
export const setShowSuccessToast = (payload: string | undefined): any => action(PortfolioTypes.SHOW_SUCCESS_TOAST, payload);

