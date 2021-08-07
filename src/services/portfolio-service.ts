import axios from "axios";

export const getCompletePortfolio = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/portfolio/`);
}
