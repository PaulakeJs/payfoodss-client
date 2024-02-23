import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VerifyUser } from "../apicalls/users";
import { SetLoader } from "../redux/loaderSlice";

const Verify = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const onfinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await VerifyUser(values, id);
      dispatch(SetLoader(false));
      if (res.success) {
        alert(res.message);
        nav("/");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      alert(error.message);
    }
  };
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.verified == "true") {
      nav("/");
    }
  }, []);
  return (
    <div className="p-10 ">
      <div className=" mb-5">
        <span onClick={() => nav(-1)} className="text-indigo-400">
          Go Back
        </span>
      </div>
      <h3 className="text-2xl">Verify Your Account</h3>
      <div className="mt-5 mb-5">
        <p className="text-lg font-light">
          Hello @{" "}
          <span className="text-indigo-400 font-semibold">{user.username}</span>{" "}
          an email with a 5-digit verification code has been sent to your
          account check
          <span className="text-indigo-400 font-semibold">
            {" "}
            {user.email}
          </span>{" "}
          for your otp
        </p>
      </div>
      <Form onFinish={onfinish}>
        <Form.Item name={"code"} rules={rules}>
          <Input type="number" placeholder="Code" />
        </Form.Item>
        <p className="text-xl">
          {" "}
          No Code Yet{" "}
          <span onClick={() => window.location.reload()}>Resend code</span>
        </p>
        <Button
          type="default"
          className="mt-5 bg-indigo-400 text-white"
          htmlType="submit"
          block
        >
          Verify
        </Button>
      </Form>
    </div>
  );
};

export default Verify;
