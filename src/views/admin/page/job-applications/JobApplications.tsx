import { DashboardContent } from "src/layouts/dashboard";
import JobApplicationsTable from "./JobApplicationsTable";

export default function JobApplications() {
  return (
    <DashboardContent>
      <JobApplicationsTable />
    </DashboardContent>
  );
}
