import api from "./api";

export const aboutService = {
  getAbout: async () => {
    const { data } = await api.get("/about");
    return data;
  },
};
