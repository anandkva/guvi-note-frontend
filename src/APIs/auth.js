import { axiosPost } from "./axios";

export const register = (token, data) => {
  return axiosPost(`/auth/register`, token, data);
};

export const login = (token, data) => {
  return axiosPost(`/auth/login`, token, data);
};
