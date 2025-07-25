import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./app/ui/Layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import { Provider } from "react-redux";
import store from "./shared/store/store.js";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Auth/Login/Login.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.PROD ? "/sunmait-spring/" : "/"}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
