import { ILog, ILogsStates, LogTypes } from "./types";

const initialState: ILogsStates = {
  error: undefined,
  loading: false,
  logs: [],
}

function reducer(state = initialState, action: any): ILogsStates {
  switch(action.type) {
    // GET ALL
    case LogTypes.GET_ALL_LOGS_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LogTypes.GET_ALL_LOGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        logs: action.payload
      }
    }
    case LogTypes.GET_ALL_LOGS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    // GET BY TYPE
    case LogTypes.GET_LOGS_BY_TYPE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LogTypes.GET_LOGS_BY_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        logs: action.payload
      }
    }
    case LogTypes.GET_LOGS_BY_TYPE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    // CREATE
    case LogTypes.CREATE_LOG_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LogTypes.CREATE_LOG_SUCCESS: {
      const returnedPayload: ILog = action.payload;
      const stateLogs = state.logs;
      stateLogs.push(returnedPayload);
      return {
        ...state,
        loading: false,
        logs: stateLogs,
      }
    }
    case LogTypes.CREATE_LOG_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    // EDIT
    case LogTypes.UPDATE_LOG_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LogTypes.UPDATE_LOG_SUCCESS: {
      const returnedPayload: ILog = action.payload;
      return {
        ...state,
        loading: false,
        logs: state.logs.map(log => {
          if(log._id !== returnedPayload._id)
            return log;
          else
            return returnedPayload;
        }),
      }
    }
    case LogTypes.UPDATE_LOG_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    // DELETE
    case LogTypes.DELETE_LOG_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case LogTypes.DELETE_LOG_SUCCESS: {
      const returnedPayload: ILog = action.payload;
      return {
        ...state,
        loading: false,
        logs: state.logs.filter(log => log._id !== returnedPayload._id),
      }
    }
    case LogTypes.DELETE_LOG_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    // SHOW TOAST
    case LogTypes.SHOW_SUCCESS_TOAST: {
      return {
        ...state,
        loading: false,
        showSuccessToast: action.payload,
      }
    }
    case LogTypes.SHOW_FAIL_TOAST: {
      return {
        ...state,
        loading: false,
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
