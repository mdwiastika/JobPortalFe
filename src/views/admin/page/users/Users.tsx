import { Card, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { DashboardContent } from "src/layouts/dashboard";
import UsersTable from "./UserTable";

export default function Users() {
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New user
        </Button>
      </Box>

      <Card>
        <div className="min-h-screen">
          <UsersTable />
        </div>
      </Card>
    </DashboardContent>
  );
}
