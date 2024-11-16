import axiosInstance from "src/axiosInstance";

export default async function GetUser() {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
