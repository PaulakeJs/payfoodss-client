import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteRecipes } from "../../../apicalls/recipes";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";

const DeleteRecipe = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const del = async () => {
      try {
        dispatch(SetLoader(true));
        const res = await DeleteRecipes(id);
        dispatch(SetLoader(false));
        if (res.success) {
          message.success(res.message);
          nav("/admin/recipes");
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
        nav("/admin/recipes");
      }
    };
    del()
  }, [id]);
  return <div> </div>;
};

export default DeleteRecipe;
