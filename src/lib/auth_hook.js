import { Api } from "../utils/api";

export const getAuthenticatedUser = (callback) => {
  Api("/auth/me", {
    token: localStorage.getItem("iwin-token"),
  }, (res) => {
    callback(res);
  });
};

export const logout = () => {
  localStorage.removeItem("iwin-token");
  window.location.href = "/";
};
