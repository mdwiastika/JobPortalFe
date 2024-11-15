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
import Dashboard from "./views/admin/page/Dashboard";
import AdminHeader from "./views/admin/partials/AdminHeader";
import { ThemeProvider } from "./theme/theme-provider";
import Companies from "./views/admin/page/Companies";
import Skiils from "./views/admin/page/Skiils";
import Categories from "./views/admin/page/Categories";
import JobPosts from "./views/admin/page/JobPosts";
import JobApplications from "./views/admin/page/JobApplications";
import Users from "./views/admin/page/users/Users";

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
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "companies", element: <Companies /> },
      { path: "skills", element: <Skiils /> },
      { path: "categories", element: <Categories /> },
      { path: "posts", element: <JobPosts /> },
      { path: "job-applications", element: <JobApplications /> },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
