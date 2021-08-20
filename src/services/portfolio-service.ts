import axios, { AxiosResponse } from "axios";
import { IPortfolioItem } from "../store/portfolio/types";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export const getPortfolio = async (): Promise<AxiosResponse<any>> => {
  return await client.get("/portfolio/");
}

export const getPortfolioByName = async (name: string) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/portfolio/name/${name}`);
}

export const createPortfolio = async (job: IPortfolioItem) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/portfolio/`, job);
}

export const updatePortfolio = async (job: IPortfolioItem) => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/portfolio/`, job);
}

export const deletePortfolio = async (id: string, name: string) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/portfolio?id=${id}&name=${name}`);
}
