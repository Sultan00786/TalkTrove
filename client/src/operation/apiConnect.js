import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method, url, data = null) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: data,
  });
};
