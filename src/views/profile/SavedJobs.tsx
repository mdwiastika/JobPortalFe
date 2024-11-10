import { Link } from "react-router-dom";
import CalendarJobIcon from "../../components/CalendarJobIcon";
import DollarIcon from "../../components/DollarIcon";
import FormatCurrency from "../../components/FormatCurrency";
import FormatString from "../../components/FormatString";
import PinPointJobIcon from "../../components/PinPointJobIcon";
import TimeIcon from "../../components/TimeIcon";
import Sidebar from "../partials/Sidebar";
import { useEffect } from "react";

export default function SavedJobs() {
  const jobPostings = [
    {
      id: 1,
      job_posting: {
        id: 1,
        recruiter_id: 123,
        title: "Software Engineer",
        slug: "software-engineer",
        description:
          "We are looking for a skilled software engineer to join our dynamic development team. You will collaborate with cross-functional teams to design, develop, and maintain scalable applications while mentoring junior developers.",
        requirements: "Bachelor's degree in Computer Science...",
        employment_type: "full_time",
        experience_level: "mid",
        work_type: "remote",
        min_salary: 2500000,
        max_salary: 4000000,
        location: "New York, NY",
        is_disability: false,
        created_at: "2024-11-01",
        recruiter: {
          user: {
            full_name: "John Doe",
            email: "john@gmail.com",
          },
          company: {
            name: "Tech Company",
            location: "New York, NY",
            logo: "/jobs/brand.svg",
          },
        },
      },
    },
    {
      id: 2,
      job_posting: {
        id: 2,
        recruiter_id: 124,
        title: "Frontend Developer",
        slug: "frontend-developer",
        description:
          "We are looking for a talented frontend developer to create exceptional user experiences.Scalability while maintaining responsive design principles and ensuring cross-browser compatibility.",
        requirements: "Experience with React and TypeScript...",
        employment_type: "full_time",
        experience_level: "junior",
        work_type: "on_site",
        min_salary: 2000000,
        max_salary: 3500000,
        location: "San Francisco, CA",
        is_disability: false,
        created_at: "2024-10-25",
        recruiter: {
          user: {
            full_name: "Jane Smith",
            email: "jane@gmail.com",
          },
          company: {
            name: "Web Solutions",
            location: "San Francisco, CA",
            logo: "/jobs/brand.svg",
          },
        },
      },
    },
    {
      id: 3,
      job_posting: {
        id: 3,
        recruiter_id: 125,
        title: "Backend Developer",
        slug: "backend-developer",
        description:
          "We are looking for a skilled backend developer to strengthen our engineering team. backend programming languages and maintaining databases while ensuring high performance and responsiveness to requests from the front-end.",
        requirements: "Experience with Node.js and databases...",
        employment_type: "contract",
        experience_level: "senior",
        work_type: "remote",
        min_salary: 3000000,
        max_salary: 5000000,
        location: "Austin, TX",
        is_disability: false,
        created_at: "2024-10-20",
        recruiter: {
          user: {
            full_name: "Alice Johnson",
            email: "alice@gmail.com",
          },
          company: {
            name: "Backend Corp",
            location: "Austin, TX",
            logo: "/jobs/brand.svg",
          },
        },
      },
    },
  ];
  const removeSavedJob = (id: number) => {
    console.log(`Remove saved job with ID: ${id}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-slate-100/60 py-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        <Sidebar />
        <div className="content col-span-3 min-h-screen p-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Saved Jobs</h2>
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="p-4 shadow-sm flex flex-row gap-3 items-start bg-white rounded-md"
              >
                <img
                  src={job.job_posting.recruiter.company.logo}
                  className="w-16 lg:w-20 h-auto mt-4"
                  alt=""
                />
                <div>
                  <h4 className="text-sm font-normal">
                    {job.job_posting.recruiter.company.name}
                  </h4>
                  <h3 className="text-base lg:text-lg font-semibold mt-2">
                    {job.job_posting.title}
                  </h3>
                  <div className="flex justify-between gap-4 mt-2">
                    <div className="flex gap-1 justify-center items-center">
                      <TimeIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {FormatString(job.job_posting.employment_type)}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <DollarIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {FormatCurrency(job.job_posting.min_salary)} -{" "}
                        {FormatCurrency(job.job_posting.max_salary)}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <PinPointJobIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {job.job_posting.location}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <CalendarJobIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {job.job_posting.created_at}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm lg:text-base">
                      {job.job_posting.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/jobs/${job.job_posting.slug}`}
                      className="mt-4 bg-blue-700 text-white py-1.5 px-4 rounded-md"
                    >
                      Read More
                    </Link>
                    <button
                      onClick={() => removeSavedJob(job.id)}
                      className="mt-4 bg-red-600 text-white py-1 px-4 rounded-md mx-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
