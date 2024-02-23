import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoader } from "../../redux/loaderSlice";
import { DeleteItemFromCart } from "../../apicalls/cartapi";

const DeleteCartItem = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const deleteItem = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteItemFromCart(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        nav("/cart");
      } else {
        throw new Error(res.message);
        nav("/cart");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
      nav("/cart");
    }
  };
  useEffect(() => {
    deleteItem();
  }, []);
  return <div></div>;
};

export default DeleteCartItem;
