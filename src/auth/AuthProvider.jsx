import { useState } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, refreshTokenApi, registerApi } from "../api/AuthApi";
import { useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [admin] = useState(localStorage.getItem("admin"));
  const navigate = useNavigate();

  async function loginAction(body) {
    try {
      const response = await loginApi(body);
      if (response.statusCode === 400 || response.statusCode === 404) {
        return response;
      }

      setToken(response.result.token);
      const expirationTime = Date.now() + response.result.expiresIn * 1000; // Konversi durasi token ke milidetik

      if (response.result.user.role === "ADMIN") {
        localStorage.setItem("admin", true);
        localStorage.setItem("token", response.result.token);
        localStorage.setItem("tokenExpiration", expirationTime);
        navigate("/dashboard/user"); // Pindahkan ini setelah menyimpan status admin
        return;
      }

      localStorage.removeItem("admin");
      localStorage.setItem("token", response.result.token);
      localStorage.setItem("tokenExpiration", expirationTime);
      navigate("/area");
      return;
    } catch (error) {}
  }

  async function registerAction(body) {
    try {
      const response = await registerApi(body);
      if (response.statusCode === 400) {
        return response;
      }
      setToken(response.result.token);
      const expirationTime = Date.now() + response.result.expiresIn * 1000; // Konversi durasi token ke milidetik

      localStorage.removeItem("admin");
      localStorage.setItem("token", response.result.token);
      localStorage.setItem("tokenExpiration", expirationTime);
      navigate("/area");
      return;
    } catch (error) {}
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("admin");
    navigate("/login");
  }

  async function checkTokenExpiration() {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration);
      if (Date.now() > expirationTime) {
        try {
          const response = await refreshTokenApi(token);
          setToken(response.result.token);
          const expirationTime = Date.now() + response.result.expiresIn * 1000; // Konversi durasi token ke milidetik
          localStorage.setItem("token", response.result.token);
          localStorage.setItem("tokenExpiration", expirationTime);
          return;
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    checkTokenExpiration(token);
  }, [navigate, token]);

  return (
    <AuthContext.Provider
      value={{ token, admin, loginAction, registerAction, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
