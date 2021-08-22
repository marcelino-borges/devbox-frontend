export enum LogTypes {
  //GET ALL
  GET_ALL_LOGS_REQUEST = "@logs/GET_ALL_LOGS_REQUEST",
  GET_ALL_LOGS_SUCCESS = "@logs/GET_ALL_LOGS_SUCCESS",
  GET_ALL_LOGS_ERROR = "@logs/GET_ALL_LOGS_ERROR",
  //GET BY TYPE
  GET_LOGS_BY_TYPE_REQUEST = "@logs/GET_LOG_BY_TYPE_REQUEST",
  GET_LOGS_BY_TYPE_SUCCESS = "@logs/GET_LOG_BY_TYPE_SUCCESS",
  GET_LOGS_BY_TYPE_ERROR = "@logs/GET_LOG_BY_TYPE_ERROR",
  //CREATE
  CREATE_LOG_REQUEST = "@logs/CREATE_LOG_REQUEST",
  CREATE_LOG_SUCCESS = "@logs/CREATE_LOG_SUCCESS",
  CREATE_LOG_ERROR = "@logs/CREATE_LOG_ERROR",
  //EDIT
  UPDATE_LOG_REQUEST = "@logs/UPDATE_LOG_REQUEST",
  UPDATE_LOG_SUCCESS = "@logs/UPDATE_LOG_SUCCESS",
  UPDATE_LOG_ERROR = "@logs/UPDATE_LOG_ERROR",
  //DELETE
  DELETE_LOG_REQUEST = "@logs/DELETE_LOG_REQUEST",
  DELETE_LOG_SUCCESS = "@logs/DELETE_LOG_SUCCESS",
  DELETE_LOG_ERROR = "@logs/DELETE_LOG_ERROR",

  SHOW_SUCCESS_TOAST = "@logs/SHOW_SUCCESS_TOAST",
  SHOW_FAIL_TOAST = "@logs/SHOW_FAIL_TOAST"
}

export interface ILog {
  _id?: string;
  title: string;
  content?: string;
  error?: string;
  type: LogType;
}

export enum LogType {
  ERROR,
  INFO,
  WARN
}

export enum DefaultLogTitles {
  EMAIL_ERROR = "EMAIL_ERROR"
}

export interface ILogsStates {
  loading: boolean;
  error: any;
  logs: ILog[];
  showSuccessToast?: string;
  showFailToast?: string;
}
