import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Button, Form, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { GetRecipeById, UpdateRecipeById } from "../../../apicalls/recipes";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { UploadFoodImage } from "../../../apicalls/recipes";

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [data, setData] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const res = await GetRecipeById(id);
      dispatch(SetLoader(false));
      if (res.success) {
        setData(res.data);
        formRef.current.setFieldsValue(res.data);
        setImage(res.data.images || []);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []); // Call getData() when the component mounts

  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("foodId", data._id);
      const response = await UploadFoodImage(formData);
      dispatch(SetLoader(false));
      message.success(response.message);
      setFile(null);
      getData();
      setImage([...image, data.images]);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await UpdateRecipeById(id, values);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        navigate("/admin/recipes");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="flex gap-28 p-4">
      <Sidebar />
      <div className="">
        <div className="bg-white w-[500px] rounded-xl">
          <Form
            layout="vertical"
            className="p-5"
            onFinish={onFinish}
            ref={formRef} // Assign the form ref
          >
            <Form.Item label="Food Title" name="title">
              <Input type="text" placeholder="Avocado Toast" />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input type="text" placeholder="$10.99" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" placeholder="Beautiful Toast" />
            </Form.Item>
            <div className="mb-7">
              <div className="flex gap-7 mt-5">
                {image.map((img) => (
                  <img
                    key={img}
                    src={img}
                    className="h-12 w-12 object-cover rounded-full"
                    alt="food"
                  />
                ))}
              </div>
              <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={(info) => setFile(info.file)}
              >
                <Button className="mt-3 mb-3" type="default">
                  Choose Images
                </Button>
              </Upload>
              <div className="flex justify-end mt-3">
                <Button disabled={!file} onClick={upload}>
                  Upload Image
                </Button>
              </div>
            </div>
            <Form.Item label="Categories" name="categories">
              <Input type="text" placeholder="Salad" />
            </Form.Item>
            <Form.Item label="Ingredients" name="ingridents">
              <TextArea type="text" placeholder="Eggs Oil Chicken" />
            </Form.Item>
            <Form.Item label="Nutritional Information" name="ninfo">
              <TextArea type="text" placeholder="Energy 10kcal" />
            </Form.Item>
            <Button type="default" htmlType="submit" block>
              Update Recipe
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
