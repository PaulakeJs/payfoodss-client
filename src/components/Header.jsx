import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [ismenuopen, setIsmenuopen] = React.useState(true);

  const toggle = () => {
    setIsmenuopen(!ismenuopen);
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center rounded-lg">
        <div>
          <Link to="/" className="text-indigo-400 text-xl font-semibold">
            PayFoods
          </Link>
        </div>

        <div className="flex flex-row gap-3">
          <Link className="hidden md:block text-indigo-400">Orders</Link>
          <Link className="hidden md:block text-indigo-400">Bookings</Link>
          <span
            onClick={() => navigate("/cart")}
            className="hidden md:block text-indigo-400 cursor-pointer"
          >
            Cart
          </span>
        </div>

        <div>
          {ismenuopen ? (
            <div className="md:hidden cursor-pointer" onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </div>
          ) : (
            <div className="md:hidden cursor-pointer" onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
              </svg>
            </div>
          )}

          <div className="hidden md:block">
            <div
              className="flex gap-2 items-center cursor-pointer "
              onClick={() => {
                if (user.role !== "admin") {
                  navigate("/account");
                } else {
                  navigate("/admin");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
              </svg>
              <div>{user.username}</div>
            </div>
          </div>
        </div>
      </div>

      {!ismenuopen && (
        <div className="bg-indigo-950 md:hidden w-screen fixed">
          <span
            onClick={() => {
              if (user.role != "admin") {
                navigate("/account");
              } else {
                navigate("/admin");
              }
            }}
            className="text-white cursor-pointer p-2 block"
          >
            {user.username}
          </span>
          <Link className="text-white cursor-pointer p-2 block">Orders</Link>
          <Link className="text-white cursor-pointer p-2 block">Bookings</Link>
          <span
            onClick={() => navigate("/cart")}
            className=" p-2 text-white cursor-pointer"
          >
            Cart
          </span>
        </div>
      )}
    </>
  );
};

export default Header;
