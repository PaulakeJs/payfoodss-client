import { axiosInstance } from "./axiosInstance";

export const NewDeliveryInfo = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/delivery/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetDeliveryInfo = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/delivery/get/${id}`)
        return response.data
    }
    catch(error){
        return error.message
    }
}