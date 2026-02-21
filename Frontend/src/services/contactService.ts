import { Contact } from "../types/contact.types";
import api from "./api";

export const contactService = {
  create: async (contactData: Contact) => {
    const { data } = await api.post("/contacts", contactData);
    return data;
  },
};
