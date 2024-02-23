import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  const { user } = useSelector((state) => state.users);

  const nav = useNavigate();
  useEffect(() => {
    if (user.role != "admin") {
      nav("/");
    }
  }, []);
  return (
    <div className="p-5 bg-white w-[290px] rounded-xl h-72">
      {user.role === "admin" && (
        <div>
          {" "}
          <div className="flex justify-between items-center">
            <p className="text-xl font-light">{user.username}</p>
            <Button
              type="default"
              onClick={() => {
                localStorage.removeItem("token");
                nav("/account/signin");
              }}
            >
              Logout
            </Button>
          </div>
          <div className="menu-items mt-10 flex flex-col gap-3">
            <div
              onClick={() => {
                nav("/admin/recipes");
              }}
              className={
                active === "recipe"
                  ? "flex gap-3 p-3 rounded-3xl bg-indigo-400 text-white"
                  : "flex gap-3 p-3 rounded-3xl hover:bg-indigo-400 hover:text-white"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M21 2V22H19V15H15V8C15 4.68629 17.6863 2 21 2ZM19 4.53C18.17 5 17 6.17 17 8V13H19V4.53ZM9 13.9V22H7V13.9C4.71776 13.4367 3 11.419 3 9V3H5V10H7V3H9V10H11V3H13V9C13 11.419 11.2822 13.4367 9 13.9Z"></path>
              </svg>
              <p>Recipes</p>
            </div>
            <div
              className={
                active === "order"
                  ? "flex gap-3 p-3 rounded-3xl bg-indigo-400 text-white"
                  : "flex gap-3 p-3 rounded-3xl hover:bg-indigo-400 hover:text-white"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
              </svg>
              <p>Orders</p>
            </div>
            <div
              className={
                active === "tables"
                  ? "flex gap-3 p-3 rounded-3xl bg-indigo-400 text-white"
                  : "flex gap-3 p-3 rounded-3xl hover:bg-indigo-400 hover:text-white"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M13 15V19H16V21H8V19H11V15H4C3.44772 15 3 14.5523 3 14V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V14C21 14.5523 20.5523 15 20 15H13ZM5 13H19V5H5V13ZM8 8H16V10H8V8Z"></path>
              </svg>
              <p>Resarvation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
