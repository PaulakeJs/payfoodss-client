import React from "react";
import Sidebar from "./Sidebar";
import RecipeList from "./RecipeList";

const Recipes = () => {
  const [active, setActive] = React.useState("recipe");
  return (
    <div className="p-4 flex gap-10">
      <Sidebar active={active} />
      <RecipeList/>
    </div>
  );
};

export default Recipes;
