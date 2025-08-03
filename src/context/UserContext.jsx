import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const handleLogin = async (emailImput, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailImput, password }),
      });

      const data = await response.json();

      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });
        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", emailImput);
      // localStorage.setItem("token", true);

      setToken(data.token);
      setEmail(emailImput);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login error",
      });
      return false;
    }
  };

  // REGISTRO
  const handleRegister = async (emailInput, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, password }),
      });

      const data = await response.json();

      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });

        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", emailInput);

      setToken(data.token);
      setEmail(emailInput);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registro fallido.",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setToken("");
    setEmail("");
  };

  const getProfile = async () => {
    if (!token) return null;

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("No se pudo obtener el perfil");
      }

      const data = await res.json();
      if (data?.email) setEmail(data.email);
      return data;
    } catch (error) {
      console.error("Error obteniendo el perfil:", error);
      return null;
    }
  };

  const createCheckout = async (checkoutData) => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario no autenticado.",
      });
      return false;
    }

    try {
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error en checkout:", data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data?.error || "Error al procesar el checkout.",
        });
        return false;
      }

      return data; 
    } catch (error) {
      console.error("Error en createCheckout:", error);
       Swal.fire({
          icon: "error",
          title: "Error",
          text: "Fallo al conectar con el servidor.",
        });
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        setToken,
        setEmail,
        logout,
        handleLogin,
        handleRegister,
        getProfile,
        createCheckout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
