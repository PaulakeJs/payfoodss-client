import React, { useEffect } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminComponents/Sidebar";
const Admin = () => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.users);

  return (
    <div>
      <div className="p-4 flex">
        <Sidebar/>
      </div>
    </div>
  );
};

export default Admin;
