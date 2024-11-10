import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";
import PostIndex from "./views/post";
import Header from "./views/partials/Header";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import PostDetail from "./views/post/PostDetail";
import EditProfile from "./views/profile/EditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/jobs" element={<PostIndex />} />
      <Route path="/companies" element={<PostIndex />} />
      <Route path="/my-profile" element={<EditProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs/:slug" element={<PostDetail />} />
      <Route path="/jobs/category/:slug" element={<PostIndex />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
