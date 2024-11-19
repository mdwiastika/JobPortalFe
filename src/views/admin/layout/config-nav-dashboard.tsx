import { SvgColor } from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    width="100%"
    height="100%"
    src={`/assets/icons/navbar/${name}.svg`}
  />
);

export const navData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: icon("ic-analytics"),
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: icon("ic-user"),
  },
  {
    title: "Companies",
    path: "/admin/companies",
    icon: icon("ic-company"),
  },
  {
    title: "Skills",
    path: "/admin/skills",
    icon: icon("ic-skills"),
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: icon("ic-category"),
  },
  {
    title: "Job Posts",
    path: "/admin/posts",
    icon: icon("ic-post"),
  },
  {
    title: "Job Applications",
    path: "/admin/job-applications",
    icon: icon("ic-jobapp"),
  },
  {
    title: "My Profile",
    path: "/admin/my-profile",
    icon: icon("my-profile"),
  },
  {
    title: "Logout",
    path: "/admin/logout",
    icon: icon("ic-logout"),
  },
];
