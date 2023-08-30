// authContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  authenticated: false,
  token: null,
  user: null,
  authLogin: () => {},
  authLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  const [authenticated, setAuthenticated] = useState(!!authToken);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(authToken || "");

  const navigate = useNavigate();


  const authLogin = ({ authToken, user }) => {
    setUser(user);
    setToken(authToken);
    setAuthenticated(true);
    localStorage.setItem("authToken", authToken);
    navigate("/");
  };

  const authLogout = () => {
    setUser({});
    setToken("");
    setAuthenticated(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        token,
        user,
        authLogin,
        authLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
