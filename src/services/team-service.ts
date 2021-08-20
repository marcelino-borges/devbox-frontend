import axios from "axios";
import { ITeamMember } from "../store/team/types";

export const getTeamMembers = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/`);
}

export const getTeamMemberByEmail = async (email: string) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/email/${email}`);
}

export const createTeammate = async (teammate: ITeamMember) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/team/`, teammate);
}

export const updateTeammate = async (teammate: ITeamMember) => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/team/`, teammate);
}

export const deleteTeammate = async (id: string, email: string) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/team?id=${id}&email=${email}`);
}
