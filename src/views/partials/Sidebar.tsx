import { Link, useLocation } from "react-router-dom";
import ApplyIcon from "../../components/ApplyIcon";
import ProfileIcon from "../../components/ProfileIcon";
import SavedIcon from "../../components/SavedIcon";

export default function Sidebar() {
  const currentPath = useLocation().pathname;
  return (
    <div className="sidebar col-span-1 bg-white p-2">
      <h2 className="text-lg font-medium">Sidebar</h2>
      <ul className="mt-4 mx-4">
        <Link
          to={"/my-profile"}
          className={`my-2 flex justify-start items-center gap-2 rounded-md hover:bg-slate-300/50 transition-all duration-300 py-2 px-5 text-slate-600 ${
            currentPath === "/my-profile" ? "bg-slate-300/50" : ""
          }`}
        >
          <ProfileIcon className="w-5 h-5" />
          <span>Edit Profile</span>
        </Link>
        <Link
          to={"/my-profile/saved-jobs"}
          className={`my-2 flex justify-start items-center gap-2 rounded-md hover:bg-slate-300/50 transition-all duration-300 py-2 px-5 text-slate-600 ${
            currentPath === "/my-profile/saved-jobs" ? "bg-slate-300/50" : ""
          }`}
        >
          <SavedIcon className="w-5 h-5" />
          <span>Saved Jobs</span>
        </Link>
        <Link
          to={"/my-profile/apply-jobs"}
          className={`my-2 flex justify-start items-center gap-2 rounded-md hover:bg-slate-300/50 transition-all duration-300 py-2 px-5 text-slate-600 ${
            currentPath === "/my-profile/apply-jobs" ? "bg-slate-300/50" : ""
          }`}
        >
          <ApplyIcon className="w-5 h-5" />
          <span>Applied Jobs</span>
        </Link>
      </ul>
    </div>
  );
}
