import axios from "axios";
import { ITeamMember } from "../store/team/types";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export const getTeamMembers = async () => {
  return await client.get(`/team/`);
}

export const getTeamMemberByEmail = async (email: string) => {
  return await client.get(`/team/email/${email}`);
}

export const createTeammate = async (teammate: ITeamMember) => {
  return await client.post(`/team/`, teammate);
}

export const updateTeammate = async (teammate: ITeamMember) => {
  return await client.put(`/team/`, teammate);
}

export const deleteTeammate = async (id: string, email: string) => {
  return await client.delete(`/team?id=${id}&email=${email}`);
}
