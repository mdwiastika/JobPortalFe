import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Sidebar from "../partials/Sidebar";
import FormatString from "../../components/FormatString";
import { useEffect } from "react";

export default function AppliedJobs() {
  // arr object (job_posting: {title, slug, recuriter, company, location, created_at})
  const appliedJobs = [
    {
      id: 1,
      status: "applied",
      job_posting: {
        title: "Frontend Developer",
        slug: "frontend-developer",
        recruiter: {
          user: {
            full_name: "John Doe",
            email: "johndoe",
          },
          company: {
            name: "Tech Company",
            logo: "/jobs/brand.svg",
          },
        },
        created_at: "2021-08-10",
      },
    },
    {
      id: 2,
      status: "interview",
      job_posting: {
        title: "Backend Developer",
        slug: "backend-developer",
        recruiter: {
          user: {
            full_name: "Jane Smith",
            email: "janesmith",
          },
          company: {
            name: "Web Solutions",
            logo: "/jobs/brand.svg",
          },
        },
        created_at: "2021-08-15",
      },
    },
    {
      id: 3,
      status: "rejected",
      job_posting: {
        title: "Fullstack Developer",
        slug: "fullstack-developer",
        recruiter: {
          user: {
            full_name: "Alice Johnson",
            email: "alicejohnson",
          },
          company: {
            name: "Web Designers",
            logo: "/jobs/brand.svg",
          },
        },
        created_at: "2021-08-20",
      },
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-slate-100/60 py-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        <Sidebar />
        <div className="content bg-white col-span-3 min-h-screen p-4">
          <h2 className="font-semibold">Applied Jobs</h2>
          <Table aria-label="Example static collection table" className="py-4">
            <TableHeader>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {appliedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.job_posting.title}</TableCell>
                  <TableCell>
                    {job.job_posting.recruiter.company.name}
                  </TableCell>
                  <TableCell
                    className={`text-blue-700 ${
                      job.status == "rejected" ? "text-red-700" : ""
                    }
                    ${job.status == "interview" ? "text-yellow-700" : ""}
                    ${job.status == "applied" ? "text-gray-800" : ""}
                    ${job.status == "hired" ? "text-green-700" : ""}
                    `}
                  >
                    {FormatString(job.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
