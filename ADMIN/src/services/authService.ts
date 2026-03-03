import type { Auth } from "../types/auth.types";
import api from "./api";

export const authService = {
  login: async (credentials: Auth) => {
    const { data } = await api.post("/auth/login", credentials);

    if (data.data.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getMe: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  isLoggedIn: () => !!localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
