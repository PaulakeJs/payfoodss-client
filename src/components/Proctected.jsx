import { message } from "antd";
import React, { useEffect } from "react";
import { CurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { SetUser } from "../redux/usersSlice";
import Welcome from "./Welcome";
import Header from "./Header";

function Proctected({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatetoken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await CurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        localStorage.removeItem("token");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));

      localStorage.removeItem("token");
      message.error(error.message);
    }
  };
  const verify = () => {
    if (user?.verified == "false") {
      navigate(`/account/verify/${user?._id}`);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validatetoken();
      verify();
    }
  }, []);

  return (
    <div>
      {user && (
        <div className="p-0">
          {(user.verified == "true" && <Header user={user} />)}
          <div>{children}</div>
        </div>
      )}
      {user?.verified == "false" && <> </>}
      {!user && <Welcome />}
    </div>
  );
}

export default Proctected;
