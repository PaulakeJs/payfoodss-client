import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";

const Signup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onfinish = async (values) => {
    values.role = "user";
    values.status = "active";
    try {
      dispatch(SetLoader(true));
      const res = await NewUser(values);
      dispatch(SetLoader(false));
      if (res.success) {
        alert(res.message);
        localStorage.setItem("token", res.data);
        nav(`/account/verify/${res.id}`);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      alert(error.message);
    }
  };
  useEffect(() => {
    const lo = localStorage.getItem("token");
    if (lo) {
      nav("/");
    }
  }, []);
  return (
    <div className="px-5 p-20 flex justify-center items-center">
      <div>
        <h3 className="text-2xl">Geting Started</h3>

        <div>
          <p className="mt-3 text-xl font-light">
            Looks like you are new to us. Create an account to get started
          </p>
        </div>
        <Form layout="vertical" className=" mt-10" onFinish={onfinish}>
          <Form.Item name={"username"}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name={"email"}>
            <Input type="email" placeholder="E-mail" />
          </Form.Item>
          <Form.Item name={"phone"}>
            <Input type="number" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name={"password"}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="w-32 mt-48 bg-indigo-400 text-white"
            block
          >
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
