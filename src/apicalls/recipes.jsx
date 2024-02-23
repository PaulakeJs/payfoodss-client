import { axiosInstance } from "./axiosInstance";

export const NewRecipe = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/food/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllRecipe = async () => {
  try {
    const response = await axiosInstance.get("/api/food/get-all-recipes");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetRecipeById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/food/get-recipe-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteRecipes = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/food/delete-recipe/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateRecipeById = async (id, payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/food/update-recipe/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UploadFoodImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/food/add-food-image",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetPageRecipeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/food/get-recipe-byId/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
