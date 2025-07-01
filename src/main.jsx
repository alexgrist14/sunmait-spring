import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./app/ui/Layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <Home />
    </Layout>
  </StrictMode>
);
