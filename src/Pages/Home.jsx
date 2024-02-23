import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import Dishes from "../components/Dishes";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.verified == "false") {
      window.location.href = `/account/verify/${user._id}`;
    }
  }, []);
  return (
    <div className="md:max-w-600 md:mx-auto">
      <Banner />
      <Dishes />
    </div>
  );
};

export default Home;
