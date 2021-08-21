import { IPortfolioItem, IPortfolioStates, PortfolioTypes } from "./types";

const initialState: IPortfolioStates = {
  error: undefined,
  loading: false,
  portfolio: [],
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
    case PortfolioTypes.CREATE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.CREATE_PORTFOLIO_SUCCESS: {
      const returnedPayload: IPortfolioItem = action.payload;
      const statePortfolio = state.portfolio;
      statePortfolio.push(returnedPayload);
      return {
        ...state,
        loading: false,
        portfolio: statePortfolio,
        showSuccessToast: "Portfolio successfully created!",
      }
    }
    case PortfolioTypes.CREATE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error creating teammate!",
      }
    }
    // EDIT
    case PortfolioTypes.UPDATE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.UPDATE_PORTFOLIO_SUCCESS: {
      const returnedPayload: IPortfolioItem = action.payload;
      return {
        ...state,
        loading: false,
        portfolio: state.portfolio.map(port => {
          if(port._id !== returnedPayload._id)
            return port;
          else
            return returnedPayload;
        }),
        showSuccessToast: "Portfolio successfully updated!",
      }
    }
    case PortfolioTypes.UPDATE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error updating portfolio!",
      }
    }
    // DELETE
    case PortfolioTypes.DELETE_PORTFOLIO_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PortfolioTypes.DELETE_PORTFOLIO_SUCCESS: {
      const returnedPayload: IPortfolioItem = action.payload;
      return {
        ...state,
        loading: false,
        portfolio: state.portfolio.filter(port => port._id !== returnedPayload._id),
        showSuccessToast: "Portfolio successfully deleted!",
      }
    }
    case PortfolioTypes.DELETE_PORTFOLIO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error deleting portfolio!",
      }
    }
    case PortfolioTypes.SHOW_SUCCESS_TOAST: {
      return {
        ...state,
        loading: false,
        showSuccessToast: action.payload,
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
