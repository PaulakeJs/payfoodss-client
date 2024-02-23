import { axiosInstance } from "./axiosInstance";

export const NewOrder = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/order/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
