import axios, { AxiosResponse } from "axios";
import { ILog, LogType } from "../store/logs/types";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export const getAllLogs = async (): Promise<AxiosResponse<any>> => {
  return await client.get("/logs/");
}

export const getLogsByType = async (type: LogType) => {
  return await client.get(`/logs/type/${type}`);
}

export const createLog = async (log: ILog) => {
  return await client.post(`/logs/`, log);
}

export const updateLog = async (log: ILog) => {
  return await client.put(`/logs/`, log);
}

export const deleteLog = async (id: string) => {
  return await client.delete(`/logs/id/${id}`);
}
