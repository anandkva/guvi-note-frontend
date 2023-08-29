import { axiosPost } from "./axios";

export const inviteMail = (token, data) => {
  return axiosPost(`/mail/invite-mail`, token, data);
};
