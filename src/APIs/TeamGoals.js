import { axiosGet, axiosPost, axiosDelete, axiosPut } from "./axios";

export const createGoal = (token, data) => {
  return axiosPost(`/team-todo/create-goal`, token, data);
};

export const getGoalByMember = (token, memberId) => {
  return axiosGet(`/team-todo/team-goal/${memberId}`, token);
};

export const getTeamGoalById = (token, id) => {
  return axiosGet(`/team-todo/goal/${id}`, token);
};

export const updateTeamTodo = (token, id, data) => {
  return axiosPut(`/team-todo/update-goal/${id}`, token, data);
};
