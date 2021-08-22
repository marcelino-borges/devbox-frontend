import { action } from "typesafe-actions";
import { ILog, LogType, LogTypes } from "./types";

export const getAllLogsRequest = (): any => action(LogTypes.GET_ALL_LOGS_REQUEST);
export const getAllLogsSuccess = (payload: any): any => action(LogTypes.GET_ALL_LOGS_SUCCESS, payload);
export const getAllLogsError = (payload: any): any => action(LogTypes.GET_ALL_LOGS_ERROR, payload);

export const getLogsByTypeRequest = (payload: LogType): any => action(LogTypes.GET_LOGS_BY_TYPE_REQUEST, payload);
export const getLogsByTypeSuccess = (payload: any): any => action(LogTypes.GET_LOGS_BY_TYPE_SUCCESS, payload);
export const getLogsByTypeError = (payload: any): any => action(LogTypes.GET_LOGS_BY_TYPE_ERROR, payload);

export const createLogRequest = (payload: ILog): any => action(LogTypes.CREATE_LOG_REQUEST, payload);
export const createLogSuccess = (payload: any): any => action(LogTypes.CREATE_LOG_SUCCESS, payload);
export const createLogError = (payload: any): any => action(LogTypes.CREATE_LOG_ERROR, payload);

export const updateLogRequest = (payload: ILog): any => action(LogTypes.UPDATE_LOG_REQUEST, payload);
export const updateLogSuccess = (payload: any): any => action(LogTypes.UPDATE_LOG_SUCCESS, payload);
export const updateLogError = (payload: any): any => action(LogTypes.UPDATE_LOG_ERROR, payload);

export const deleteLogRequest = (payload: ILog): any => action(LogTypes.DELETE_LOG_REQUEST, payload);
export const deleteLogSuccess = (payload: any): any => action(LogTypes.DELETE_LOG_SUCCESS, payload);
export const deleteLogError = (payload: any): any => action(LogTypes.DELETE_LOG_ERROR, payload);

