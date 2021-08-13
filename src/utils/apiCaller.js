import axios from "axios";

export const API_URL = "http://localhost:3001";

export default function callAPI(endpoint, method = "POST", data) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}`,
    data: data,
  });
}

