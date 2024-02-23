import { axiosInstance } from "./axiosInstance";

export const AddNewItemToCart = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/cart/add", payload);
    return response.data;
  } catch (error) {
    // Check if the error has a response property
    if (error.response && error.response.data) {
      // Server returned an error message
      return error.response.data;
    } else if (error.message) {
      // If there is a general error message
      return { success: false, message: error.message };
    } else {
      // If there is no error message at all
      return { success: false, message: "An unknown error occurred." };
    }
  }
};

export const GetCartList = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/cart/cart", {
      params: payload, // Use the 'params' property for GET requests
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteItemFromCart = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/cart/cart/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
