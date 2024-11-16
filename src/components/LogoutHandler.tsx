import { useNavigate } from "react-router-dom";
import axiosInstance from "src/axiosInstance";

export default function LogoutHandler() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };
  logoutHandler();
  return null;
}
