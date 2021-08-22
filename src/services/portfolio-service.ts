import axios, { AxiosResponse } from "axios";
import { IPortfolioItem } from "../store/portfolio/types";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export const getPortfolio = async (): Promise<AxiosResponse<any>> => {
  return await client.get("/portfolio/");
}

export const getPortfolioByName = async (name: string) => {
  return await client.get(`/portfolio/name/${name}`);
}

export const createPortfolio = async (job: IPortfolioItem) => {
  return await client.post(`/portfolio/`, job);
}

export const updatePortfolio = async (job: IPortfolioItem) => {
  return await client.put(`/portfolio/`, job);
}

export const deletePortfolio = async (id: string, name: string) => {
  return await client.delete(`/portfolio?id=${id}&name=${name}`);
}
