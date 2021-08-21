export enum PortfolioTypes {
  //GET ALL
  GET_COMPLETE_PORTFOLIO_REQUEST="@portfolio/GET_COMPLETE_PORTFOLIO_REQUEST",
  GET_COMPLETE_PORTFOLIO_SUCCESS ="@portfolio/GET_COMPLETE_PORTFOLIO_SUCCESS",
  GET_COMPLETE_PORTFOLIO_ERROR ="@portfolio/GET_COMPLETE_PORTFOLIO_ERROR",
  //CREATE
  CREATE_PORTFOLIO_REQUEST ="@portfolio/CREATE_PORTFOLIO_REQUEST",
  CREATE_PORTFOLIO_SUCCESS ="@portfolio/CREATE_PORTFOLIO_SUCCESS",
  CREATE_PORTFOLIO_ERROR ="@portfolio/CREATE_PORTFOLIO_ERROR",
  //EDIT
  UPDATE_PORTFOLIO_REQUEST ="@portfolio/UPDATE_PORTFOLIO_REQUEST",
  UPDATE_PORTFOLIO_SUCCESS ="@portfolio/UPDATE_PORTFOLIO_SUCCESS",
  UPDATE_PORTFOLIO_ERROR ="@portfolio/UPDATE_PORTFOLIO_ERROR",
  //DELETE
  DELETE_PORTFOLIO_REQUEST ="@portfolio/DELETE_PORTFOLIO_REQUEST",
  DELETE_PORTFOLIO_SUCCESS ="@portfolio/DELETE_PORTFOLIO_SUCCESS",
  DELETE_PORTFOLIO_ERROR ="@portfolio/DELETE_PORTFOLIO_ERROR",

  SHOW_SUCCESS_TOAST ="@portfolio/SHOW_SUCCESS_TOAST",
  SHOW_FAIL_TOAST ="@portfolio/SHOW_ERROR_TOAST",
}
export interface IPortfolioItem {
  _id?: string;
  name: string;
  description: string;
  highlightImg: string;
  imgs?: string[];
  storeUrl?: string;
  otherUrls?: string[]
}

export interface IPortfolioStates {
  loading: boolean;
  error: any;
  portfolio: IPortfolioItem[];
  showSuccessToast?: string;
  showFailToast?: string;
}
