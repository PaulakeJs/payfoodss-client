import React from "react";
import Sidebar from "./Sidebar";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { NewRecipe } from "../../../apicalls/recipes";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onfinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await NewRecipe(values);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        nav("/admin/recipes");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const rules = [{ required: true, message: "required" }];
  return (
    <div className="p-4 flex flex-row gap-28">
      <Sidebar />
      <div className="bg-white w-[500px] rounded-xl">
        <Form layout="vertical" className="p-5 " onFinish={onfinish}>
          <Form.Item label="Food Title" name={"title"} rules={rules}>
            <Input type="text" placeholder="Avaocado Toast" />
          </Form.Item>
          <Form.Item label="Price" name={"price"} rules={rules}>
            <Input type="text" placeholder="$10.99" />
          </Form.Item>
          <Form.Item label="Description" name={"description"} rules={rules}>
            <Input type="text" placeholder="Beautiful Toast" />
          </Form.Item>
          <Form.Item label="Categories" name={"categories"} rules={rules}>
            <Input type="text" placeholder="Salad" />
          </Form.Item>
          <Form.Item label="Ingridents" name={"ingridents"} rules={rules}>
            <TextArea type="text" placeholder="Eggs Oil Chicken" />
          </Form.Item>
          <Form.Item label="Nutrical Information" name={"ninfo"} rules={rules}>
            <TextArea type="text" placeholder="Energy 10kcal" />
          </Form.Item>
          <Button type="default" htmlType="submit" block>
            Add Recipe
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddRecipe;
