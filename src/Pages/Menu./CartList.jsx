import React, { useEffect } from "react";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetCartList } from "../../apicalls/cartapi";
import { SetLoader } from "../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const CartList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [data, setData] = React.useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const formdata = {
        userId: user._id,
      };
      const res = await GetCartList(formdata);
      dispatch(SetLoader(false));
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const calculateSubtotal = () => {
    return data.reduce(
      (total, item) => total + item.foodprice * item.foodquantity,
      0
    );
  };

  const calculateQuantity = () => {
    return data.reduce((total, item) => total + item.foodquantity, 0);
  };

  const increaseQuantity = (itemId) => {
    const updatedData = data.map((item) => {
      if (item._id === itemId) {
        return { ...item, foodquantity: item.foodquantity + 1 };
      }
      return item;
    });

    setData(updatedData);
  };

  const reduceQuantity = (itemId) => {
    const updatedData = data.map((item) => {
      if (item._id === itemId && item.foodquantity > 1) {
        return { ...item, foodquantity: item.foodquantity - 1 };
      }
      return item;
    });

    setData(updatedData);
  };

  useEffect(() => {
    getData();
  }, []);

  const proceed = async () => {
    navigate("billing", { state: { data } });
  };

  return (
    <>
      {data.length > 0 && (
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                <span>
                  <AiOutlineShoppingCart className="text-xl mr-2" />
                  Cart
                </span>
                <span className="text-gray-600">
                  {calculateQuantity()} Items
                </span>
              </h2>
              {data.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4 mb-4"
                >
                  <img
                    src={item.foodimage}
                    alt={item.foodtitle}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{item.foodtitle}</p>
                    <p className="text-gray-700">
                      Price: ${item.foodprice * item.foodquantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <AiOutlineMinusCircle
                        className="text-red-500 cursor-pointer"
                        onClick={() => reduceQuantity(item._id)}
                      />
                      <span className="text-gray-700">{item.foodquantity}</span>
                      <AiOutlinePlusCircle
                        className="text-blue-500 cursor-pointer"
                        onClick={() => increaseQuantity(item._id)}
                      />
                    </div>
                  </div>
                  <AiOutlineCloseCircle
                    className="text-red-500 text-xl cursor-pointer"
                    onClick={() => navigate(`/cart/delete/${item._id}`)}
                  />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <p>Subtotal:</p>
                <p>${calculateSubtotal()}</p>
              </div>
              <div className="flex justify-between">
                <p>Total Items:</p>
                <p>{calculateQuantity()} Items</p>
              </div>
              <Button
                type="primary"
                className="rounded-md mt-6 w-full"
                onClick={proceed}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
      {data.length === 0 && (
        <p className="p-4 text-center">Your Cart Is Empty</p>
      )}
    </>
  );
};

export default CartList;
