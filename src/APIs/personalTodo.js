import { axiosGet, axiosPost, axiosDelete, axiosPut } from "./axios";

export const createTodo = (token, data) => {
  return axiosPost(`/personal/create-todo`, token, data);
};

export const getAllPersonalTodo = (token) => {
  return axiosGet("/personal/personal-todos", token);
};
export const deletePersonalTodo = (id, token) => {
  return axiosDelete(`/personal/delete-todo/${id}`, token);
};

export const editPersonalTodo = (id, token, data) => {
  return axiosPut(`/personal/edit-todo/${id}`, token, data);
};
