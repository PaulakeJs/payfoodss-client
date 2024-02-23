import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { Button, message } from "antd";
import { GetPageRecipeById } from "../../apicalls/recipes";
import { AddNewItemToCart } from "../../apicalls/cartapi";

const Menu = () => {
  // Redux state
  const { user } = useSelector((state) => state.users);

  // Local component state
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Params and dispatch
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch recipe data
  const getRecipe = async () => {
    try {
      dispatch(SetLoader(true));
      const res = await GetPageRecipeById(id);
      dispatch(SetLoader(false));

      if (res.success) {
        setData(res.data || null);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Add item to cart
  const addToCart = async () => {
    try {
      dispatch(SetLoader(true));

      // Prepare cart item data
      const cartItemData = {
        // Include necessary details from data
        foodtitle: data.title,
        foodprice: data.price,
        foodownerId: user._id,
        foodimage: data.images[0],
        // ... Other relevant data
      };

      const res = await AddNewItemToCart(cartItemData);
      dispatch(SetLoader(false));

      if (res.success) {
        message.success(res.message);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Fetch recipe data on component mount or when ID changes
  useEffect(() => {
    getRecipe();
  }, [id]);

  return (
    <div className="lg:flex lg:p-4">
      {data ? (
        <div key={data._id} className="lg:flex">
          {/* Image Gallery */}
          <div className="lg:w-1/2 images">
            <img
              src={data.images[selectedImage]}
              className="w-full h-56 object-cover"
              alt={`Recipe ${selectedImage + 1}`}
            />
            {/* Image Thumbnails */}
            <div className="flex justify-center lg:justify-start gap-3">
              {data.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`w-5 h-5 object-cover rounded-full cursor-pointer mt-2 lg:h-20 lg:w-20 ${
                    selectedImage === index
                      ? "border-2 border-solid border-orange-500 p-3"
                      : ""
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Recipe Details */}
          <div className="lg:w-1/2 p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg">{data.title}</h3>
                <p className="text-orange-500 ">${data.price}</p>
                <p className="font-extralight">Category {data.categories}</p>
              </div>
              <div>
                <Button
                  className="bg-orange-500 text-white"
                  onClick={addToCart}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
            {/* Description */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="mt-3">{data.description}</p>
            </div>
            {/* Ingredients */}
            <div className="mt-3">
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <pre style={{ whiteSpace: "pre-line" }}>{data.ingridents}</pre>
            </div>
            {/* Nutritional Information */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Nutritional Information</h3>
              <pre style={{ whiteSpace: "pre-line" }}>{data.ninfo}</pre>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Menu;
