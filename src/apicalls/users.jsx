import { axiosInstance } from "./axiosInstance";

export const NewUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/account/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const CurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/account/current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/account/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};


export const VerifyUser = async (payload, id) => {
    try {
        const response = await axiosInstance.post(`/api/account/verify/${id}`,payload)
        return response.data
    }catch(error){
        return error.message
    }
}