import { Outlet, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layout/dashboard/DashboardLayout";
import { Suspense, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { varAlpha } from "../../../theme/styles";
import GetUser from "src/components/GetUser";
export default function AdminHeader() {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await GetUser();
        if (!user) {
          navigate("/login");
        } else if (
          user.roles[0].name !== "admin" &&
          user.roles[0].name !== "super_admin" &&
          user.roles[0].name !== "recruiter"
        ) {
          navigate("/");
        } else {
          setIsValidating(false);
        }
        setRole(user.roles[0].name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }
    };
    fetchUsers();
  }, [navigate]);
  const renderFallback = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1 1 auto"
    >
      <LinearProgress
        sx={{
          width: 1,
          maxWidth: 320,
          bgcolor: (theme) =>
            varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
        }}
      />
    </Box>
  );
  if (isValidating) {
    return renderFallback;
  }
  return (
    <DashboardLayout role={role}>
      <Suspense fallback={renderFallback}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}
