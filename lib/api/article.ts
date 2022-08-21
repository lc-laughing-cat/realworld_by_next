import axios from "axios";
import { SERVER_BASE_URL } from "lib/utils/constant";

export const ArticleAPI = {
  getAll: () => axios.get(`${SERVER_BASE_URL}/articles`),

  getByAuthor: (authorName: string) =>
    axios.get(`${SERVER_BASE_URL}/articles?author=${authorName}`),
};
