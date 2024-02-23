import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SetLoader } from "../redux/loaderSlice";
import { message } from "antd";
import { GetAllRecipe } from "../apicalls/recipes";

const Dishes = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const nav = useNavigate();

  const getdishes = async () => {
    try {
      dispatch(SetLoader(true));
      const res = await GetAllRecipe();
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

  useEffect(() => {
    getdishes();
  }, []);

  return (
    <div className="p-3">
      <div className="list flex md:justify-center items-center gap-5 overflow-x-auto">
        <Link className="p-3 bg-orange-400 text-white rounded-3xl">Salad</Link>
        <Link className="text-black font-semibold">Breakfast</Link>
        <Link className="text-black font-semibold">Lunch</Link>
        <Link className="text-black font-semibold">Dinner</Link>{" "}
        <Link className="text-black font-semibold">Drinks</Link>
        <Link className="text-black font-semibold">Desert</Link>
      </div>
      <div className="flex items-center gap-5 overflow-x-auto p-3">
        {data?.map((item) => (
          <div key={item._id} className="w-full md:w-1/5">
            <div
              onClick={() => nav(`/menu/${item._id}`)}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-3 text-black"
            >
              <img
                src={item.images[0]}
                alt=""
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="text-center flex flex-col gap-2">
                <p className="text-lg font-light">{item.title}</p>
                <span className="text-orange-500">${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
