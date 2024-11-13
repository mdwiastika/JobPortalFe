import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import PostIndex from "./views/post";
import Header from "./views/partials/Header";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import PostDetail from "./views/post/PostDetail";
import EditProfile from "./views/profile/EditProfile";
import SavedJobs from "./views/profile/SavedJobs";
import AppliedJobs from "./views/profile/AppliedJobs";
import AdminHeader from "./views/partials/AdminHeader";
import Dashboard from "./views/admin/page/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <PostIndex /> },
      { path: "companies", element: <PostIndex /> },
      { path: "my-profile", element: <EditProfile /> },
      { path: "my-profile/saved-jobs", element: <SavedJobs /> },
      { path: "my-profile/apply-jobs", element: <AppliedJobs /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "jobs/:slug", element: <PostDetail /> },
      { path: "jobs/category/:slug", element: <PostIndex /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminHeader />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> }, // Hanya "dashboard" tanpa "/admin"
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
