import axios from "axios";
import { SERVER_BASE_URL } from "lib/utils/constant";

export const TagAPI = {
  getAll: () => axios.get(`${SERVER_BASE_URL}/tags`),
};
