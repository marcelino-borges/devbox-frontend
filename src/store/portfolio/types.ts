export enum PortfolioTypes {
  //GET ALL
  GET_COMPLETE_PORTFOLIO_REQUEST="@portfolio/GET_COMPLETE_PORTFOLIO_REQUEST",
  GET_COMPLETE_PORTFOLIO_SUCCESS ="@portfolio/GET_COMPLETE_PORTFOLIO_SUCCESS",
  GET_COMPLETE_PORTFOLIO_ERROR ="@portfolio/GET_COMPLETE_PORTFOLIO_ERROR",
  //CREATE
  CREATE_SINGLE_PORTFOLIO_REQUEST ="@portfolio/CREATE_SINGLE_PORTFOLIO_REQUEST",
  CREATE_SINGLE_PORTFOLIO_SUCCESS ="@portfolio/CREATE_SINGLE_PORTFOLIO_SUCCESS",
  CREATE_SINGLE_PORTFOLIO_ERROR ="@portfolio/CREATE_SINGLE_PORTFOLIO_ERROR",
  //EDIT
  EDIT_SINGLE_PORTFOLIO_REQUEST ="@portfolio/EDIT_SINGLE_PORTFOLIO_REQUEST",
  EDIT_SINGLE_PORTFOLIO_SUCCESS ="@portfolio/EDIT_SINGLE_PORTFOLIO_SUCCESS",
  EDIT_SINGLE_PORTFOLIO_ERROR ="@portfolio/EDIT_SINGLE_PORTFOLIO_ERROR",
  //DELETE
  DELETE_SINGLE_PORTFOLIO_REQUEST ="@portfolio/DELETE_SINGLE_PORTFOLIO_REQUEST",
  DELETE_SINGLE_PORTFOLIO_SUCCESS ="@portfolio/DELETE_SINGLE_PORTFOLIO_SUCCESS",
  DELETE_SINGLE_PORTFOLIO_ERROR ="@portfolio/DELETE_SINGLE_PORTFOLIO_ERROR",

  SHOW_SUCCESS_TOAST ="@portfolio/SHOW_SUCCESS_TOAST",
  SHOW_FAIL_TOAST ="@portfolio/SHOW_ERROR_TOAST",
}
export interface IPortfolioItem {
  id: number;
  name: string;
  description: string;
  highlightImg: string;
  imgs: string[];
  storeUrl: string;
  otherUrls: IPortfolioURL[]
}

export interface IPortfolioURL {
  name: string;
  url: string;
}

export interface IPortfolioStates {
  loading: boolean;
  error: any;
  portfolio: IPortfolioItem[];
  showSucessToast: boolean;
  showFailToast: boolean;
}
