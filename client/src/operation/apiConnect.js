import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = (method, url, data = null, query = null) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: data,
    query: query,
  });
};
