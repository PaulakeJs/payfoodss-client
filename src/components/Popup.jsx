import { useEffect } from "react";
import { GetPageRecipeById } from "../apicalls/recipes";
import { message } from "antd";

const PopupComponent = ({
  isPopupVisible,
  setPopupVisible,
  togglePopup,
  foodId,
}) => {
  const getRecipe = async () => {
    const res = await GetPageRecipeById(foodId);
    try {
      if (res.success) {
        throw new Error(res.message);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <div>
      {isPopupVisible && (
        <div className="fixed bottom-0 left-0 w-full h-[90%] bg-slate-100 rounded-t-[40px] shadow-2xl overflow-hidden transition-transform ease-in-out duration-300 transform translate-y-0 animate-slide-up">
          <div className="p-4">
            <span
              onClick={togglePopup}
              className="cursor-pointer text-indigo-400 font-semibold"
            >
              Close
            </span>
            <div>
              <p>{foodId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
