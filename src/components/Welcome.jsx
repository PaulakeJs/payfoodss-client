import React from 'react'

import { Button } from "antd";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div><div className="px-10 py-20">
    <div className="div">
      <div className="">
        <h2>Welcome to PayFoods</h2>
        <h3 className="text-2xl font-semibold">Lets Get Started</h3>
      </div>
      <div className="py-20 h-screen flex flex-col justify-center items-center">
        <Link className="w-80" to="/account/new">
          <Button type="default" className="bg-indigo-400 text-white" block>
            Get Started
          </Button>
        </Link>
        <Link
          className="p-3 text-indigo-400 font-sans font-medium"
          to={"/account/signin"}
        >
          Login to Your Account
        </Link>
      </div>
    </div>
  </div></div>
  )
}

export default Welcome