import axios from "axios";

export const getAllMembers = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/`);
}
