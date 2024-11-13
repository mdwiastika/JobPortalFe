import { Outlet } from "react-router-dom";
import { DashboardLayout } from "../layout/dashboard/DashboardLayout";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { varAlpha } from "../../../theme/styles";
export default function AdminHeader() {
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
  return (
    <DashboardLayout>
      <Suspense fallback={renderFallback}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}
