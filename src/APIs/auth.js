import { axiosPost, axiosGet } from "./axios";

export const register = (token, data) => {
  return axiosPost(`/auth/register`, token, data);
};

export const userLogin = (token, data) => {
  return axiosPost(`/auth/login`, token, data);
};

export const sentOPT = (token, data) => {
  return axiosPost("/auth/send-reset-otp", token, data);
};

export const resetPassword = (token, data) => {
  return axiosPost("/auth/reset-password", token, data);
};

export const getAllUsers = (token) => {
  return axiosGet("/auth/get-all", token);
};
