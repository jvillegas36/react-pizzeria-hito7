import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";
import ConxPizzaProvider from "./context/ConxPizzaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ConxPizzaProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ConxPizzaProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
