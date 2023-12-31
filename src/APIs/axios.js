import axios from "axios";
import { useNavigate } from "react-router-dom";

let api = null;

const getInitializedApi = () => {
  if (api) return api;
  return (api = axios.create({
    baseURL: "https://guvi-goal-backend.onrender.com",
    responseType: "json",
  }));
};

export const Logout = () => {
  console.log("trigger");
  const navigate = useNavigate();
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  navigate("/login");
};

export const axiosGet = async (url, token, params = "") => {
  try {
    const response = await getInitializedApi().get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
  } catch (err) {
    console.log("err get", err);
    Logout();
    throw err;
  }
};

export const axiosPost = async (url, token, data) => {
  try {
    const response = await getInitializedApi().post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("err post", err);
    Logout();
    throw err;
  }
};

export const axiosPut = async (url, token, data) => {
  try {
    const response = await getInitializedApi().put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("put err", err);
    Logout();
    throw err;
  }
};

export const axiosDelete = async (url, token, params = "") => {
  try {
    const response = await getInitializedApi().delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
  } catch (err) {
    console.log("del post", err);
    Logout();
    throw err;
  }
};
