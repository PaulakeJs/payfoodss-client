import { Button, Upload, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { UploadFoodImage } from "../../../apicalls/recipes";

const Images = ({ getData, data }) => {
  const [file = null, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();

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
      setImage(data.images);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div className="mb-7">
      <div className="flex gap-7 mt-5">
        {image.map((img) => (
          <img src={img} className="h-12 w-12 object-cover rounded-full" />
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
  );
};

export default Images;
