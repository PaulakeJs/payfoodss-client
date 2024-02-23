import React from "react";

const Loader = () => {
  return (
    <div className="fixed z-10 inset-0 bg-black flex items-center justify-center opacity-70">
      <div className="animate-spin rounded-full h-10 w-10 border-t-transparent border-indigo-400 border-solid"></div>
    </div>
  );
};

export default Loader;
