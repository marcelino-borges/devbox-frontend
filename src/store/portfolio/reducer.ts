import { IPortfolioStates, PortfolioTypes } from "./types";

const initialState: IPortfolioStates = {
  error: undefined,
  loading: false,
  portfolio: [],
  showFailToast: false,
  showSucessToast: false,
}

function reducer(state = initialState, action: any): IPortfolioStates {
  switch(action.type) {
    // GET ALL
    case PortfolioTypes.GET_COMPLETE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.GET_COMPLETE_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        loading: false,
        portfolio: action.payload
      }
    }
    case PortfolioTypes.GET_COMPLETE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    // CREATE
    case PortfolioTypes.CREATE_SINGLE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.CREATE_SINGLE_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        loading: false,
        portfolio: action.payload
      }
    }
    case PortfolioTypes.CREATE_SINGLE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    // EDIT
    case PortfolioTypes.EDIT_SINGLE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.EDIT_SINGLE_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        loading: false,
        portfolio: action.payload
      }
    }
    case PortfolioTypes.EDIT_SINGLE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    // DELETE
    case PortfolioTypes.DELETE_SINGLE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.DELETE_SINGLE_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        loading: false,
        portfolio: action.payload
      }
    }
    case PortfolioTypes.DELETE_SINGLE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case PortfolioTypes.SHOW_SUCCESS_TOAST: {
      return {
        ...state,
        loading: false,
        showSucessToast: action.payload,
      }
    }
    case PortfolioTypes.SHOW_FAIL_TOAST: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: action.payload,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer;
