import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/account/Signup";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Verify from "./components/Verify";
import Proctected from "./components/Proctected";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin/Index";
import Recipes from "./Pages/Admin/AdminComponents/Recipes";
import AddRecipe from "./Pages/Admin/AdminComponents/AddRecipe";
import EditRecipe from "./Pages/Admin/AdminComponents/EditRecipe";
import DeleteRecipe from "./Pages/Admin/AdminComponents/DeleteRecipe";
import Menu from "./Pages/Menu.";
import CartList from "./Pages/Menu./CartList";
import DeleteCartItem from "./Pages/Menu./DeleteCartItem";
import Billing from "./Pages/Menu./Billing";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Proctected>
                <Home />
              </Proctected>
            }
          />
          <Route
            path="/admin"
            element={
              <Proctected>
                <Admin />
              </Proctected>
            }
          />
          <Route
            path="/cart/delete/:id"
            element={
              <Proctected>
                <DeleteCartItem />
              </Proctected>
            }
          />
          <Route
            path="/cart/billing"
            element={
              <Proctected>
                <Billing />
              </Proctected>
            }
          />

          <Route
            path="/cart"
            element={
              <Proctected>
                <CartList />
              </Proctected>
            }
          />
          <Route
            path="/admin/recipes"
            element={
              <Proctected>
                <Recipes />
              </Proctected>
            }
          />
          <Route
            path="/admin/recipes/edit/:id"
            element={
              <Proctected>
                <EditRecipe />
              </Proctected>
            }
          />

          <Route
            path="/menu/:id"
            element={
              <Proctected>
                <Menu />
              </Proctected>
            }
          />

          <Route
            path="/admin/recipes/delete/:id"
            element={
              <Proctected>
                <DeleteRecipe />
              </Proctected>
            }
          />
          <Route
            path="/admin/recipes/add"
            element={
              <Proctected>
                <AddRecipe />
              </Proctected>
            }
          />
          <Route path="/account/new" element={<Signup />} />
          <Route path="/account/signin" element={<Login />} />
          <Route
            path="/account/verify/:id"
            element={
              <Proctected>
                <Verify />
              </Proctected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
