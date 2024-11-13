import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminSidebar from "./AdminSidebar";

export default function AdminHeader() {
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <div className="body flex-grow-1">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}
