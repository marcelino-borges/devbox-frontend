import { action } from "typesafe-actions";
import { PortfolioTypes } from "./types";

export const getCompletePortfolioRequest = (): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_REQUEST);
export const getCompletePortfolioSuccess = (payload: any): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_SUCCESS, payload);
export const getCompletePortfolioError = (payload: any): any => action(PortfolioTypes.GET_COMPLETE_PORTFOLIO_ERROR, payload);

export const createPortfolioRequest = (payload: any): any => action(PortfolioTypes.CREATE_SINGLE_PORTFOLIO_REQUEST, payload);
export const createPortfolioSuccess = (payload: any): any => action(PortfolioTypes.CREATE_SINGLE_PORTFOLIO_SUCCESS, payload);
export const createPortfolioError = (payload: any): any => action(PortfolioTypes.CREATE_SINGLE_PORTFOLIO_ERROR, payload);

export const editPortfolioRequest = (payload: any): any => action(PortfolioTypes.EDIT_SINGLE_PORTFOLIO_REQUEST, payload);
export const editPortfolioSuccess = (payload: any): any => action(PortfolioTypes.EDIT_SINGLE_PORTFOLIO_SUCCESS, payload);
export const editPortfolioError = (payload: any): any => action(PortfolioTypes.EDIT_SINGLE_PORTFOLIO_ERROR, payload);

export const deletePortfolioRequest = (payload: any): any => action(PortfolioTypes.DELETE_SINGLE_PORTFOLIO_REQUEST, payload);
export const deletePortfolioSuccess = (payload: any): any => action(PortfolioTypes.DELETE_SINGLE_PORTFOLIO_SUCCESS, payload);
export const deletePortfolioError = (payload: any): any => action(PortfolioTypes.DELETE_SINGLE_PORTFOLIO_ERROR, payload);

export const setShowFailToast = (payload: boolean): any => action(PortfolioTypes.SHOW_FAIL_TOAST, payload);
export const setShowSuccessToast = (payload: boolean): any => action(PortfolioTypes.SHOW_SUCCESS_TOAST, payload);

