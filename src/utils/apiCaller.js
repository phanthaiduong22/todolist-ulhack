import axios from "axios";

// export const API_URL = "http://localhost:3001";
export const API_URL = "http://144.126.242.103:3001";
// export const API_URL = "http://10.244.1.129:3001"; 

export default function callAPI(endpoint, method = "POST", data) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}`,
    data: data,
  });
}
