import { useEffect, useState } from "react";
import PinPointIcon from "../../components/PinPointIcon";
import SearchIcon from "../../components/SearchIcon";
import TimeIcon from "../../components/TimeIcon";
import FormatString from "../../components/FormatString";
import DollarIcon from "../../components/DollarIcon";
import FormatCurrency from "../../components/FormatCurrency";
import CalendarJobIcon from "../../components/CalendarJobIcon";
import PinPointJobIcon from "../../components/PinPointJobIcon";
import { Link } from "react-router-dom";
import { Pagination } from "@nextui-org/react";
import axiosInstance from "src/axiosInstance";

interface JobPosting {
  id: number;
  title: string;
  description: string;
  employment_type: string;
  experience_level: string;
  work_type: string;
  min_salary: number;
  max_salary: number;
  job_categories: [
    {
      id: number;
      category_name: string;
      slug_category: string;
    }
  ];
  slug: string;
  recruiter: {
    company: {
      name: string;
      logo: string;
    };
    user: {
      full_name: string;
      email: string;
    };
  };
  location: string;
  created_at: string;
}
export default function PostIndex() {
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [selectedDatePostingRange, setSelectedDatePostingRange] = useState("");
  const [selectedLevelExperienceRange, setSelectedLevelExperienceRange] =
    useState("");
  const [selectedTypeJobRange, setSelectedTypeJobRange] = useState("");
  const [selectedWorkTypeRange, setSelectedWorkTypeRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const salaryRanges = [
    "Less than 1 million",
    "1 million - 3 million",
    "3 million - 5 million",
    "5 million - 10 million",
    "More than 10 million",
  ];
  const datePostingRange = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "All",
  ];
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        const filters = {
          salary: selectedSalaryRange,
          date_posting: selectedDatePostingRange,
          level_experience: selectedLevelExperienceRange.toLowerCase(),
          type_job: selectedTypeJobRange.toLowerCase().replace("-", "_"),
          work_type: selectedWorkTypeRange.toLowerCase().replace("-", "_"),
          location: "",
          job_category: "",
        };
        const response = await axiosInstance.get("/user/search-jobs", {
          params: {
            page: currentPage,
            filters,
          },
        });
        const responseData = response.data;
        if (responseData.status === "success") {
          setJobPostings(responseData.data.data);
          setTotalPages(
            Math.ceil(responseData.data.total / responseData.data.per_page)
          );
          setTotalJobs(responseData.data.total);
        }
      } catch (error) {
        console.error("Failed to fetch job postings:", error);
      }
    };
    fetchJobPostings();
    console.log(
      `Salary: ${selectedSalaryRange}, Date Posting: ${selectedDatePostingRange}, Level Experience: ${selectedLevelExperienceRange}, Type Job: ${selectedTypeJobRange}, Work Type: ${selectedWorkTypeRange}`
    );
  }, [
    selectedSalaryRange,
    selectedDatePostingRange,
    selectedLevelExperienceRange,
    selectedTypeJobRange,
    selectedWorkTypeRange,
    currentPage,
  ]);
  useEffect(() => {
    console.log(`Current Page: ${currentPage}`);
  }, [currentPage]);
  const levelExperienceRange = ["Beginner", "Medium", "Expert"];
  const typeJobRange = ["Full-time", "Part-time", "Contract", "Internship"];
  const workTypeRange = ["Remote", "On-site", "Hybrid"];
  const handleSalaryChange = (range: string) => {
    setSelectedSalaryRange(range);
  };
  const handleLevelExperienceChange = (range: string) => {
    setSelectedLevelExperienceRange(range);
  };
  const handleTypeJobChange = (range: string) => {
    setSelectedTypeJobRange(range);
  };
  const handleWorkTypeChange = (range: string) => {
    setSelectedWorkTypeRange(range);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container mx-auto py-4 px-2 lg:px-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Find your <span className="text-blue-700">new job</span> today
        </h2>
        <p className="mt-2 px-2 lg:px-0">
          Thousands of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </p>
        <div className="grid grid-cols-8 mt-4 gap-4 lg:gap-0">
          <div className="col-span-8 lg:col-span-4 py-2 px-3 border flex justify-between items-center">
            <SearchIcon className="" />
            <input
              type="text"
              name="search_position"
              id="search_position"
              placeholder="What position are you looking for ?"
              className="w-full py-1 px-1 focus:outline-none"
            />
          </div>
          <div className="col-span-8 lg:col-span-3 py-2 px-3 border flex justify-between items-center">
            <PinPointIcon />
            <input
              type="text"
              name="search_location"
              id="search_location"
              placeholder="Location"
              className="w-full py-1 px-1 focus:outline-none"
            />
          </div>
          <div className="col-span-4 lg:col-span-1">
            <button className="bg-blue-700 text-white py-2 px-5 h-full">
              Search Job
            </button>
          </div>
        </div>
      </div>
      <div className="py-4 mt-4 bg-slate-100/60 min-h-screen">
        <div className="container mx-auto grid grid-cols-4 gap-4">
          <div className="col-span-1 hidden lg:block bg-white py-2 px-2">
            <h3 className="text-lg lg:text-xl font-semibold">Filters</h3>
            <div className="mt-4">
              <h4 className="text-base lg:text-lg font-medium">Salary</h4>
              <div className="space-y-2">
                {salaryRanges.map((range, index) => (
                  <div key={`${index}-${range}`}>
                    <input
                      type="checkbox"
                      id={`salary_range_${index}`}
                      value={range}
                      checked={selectedSalaryRange === range}
                      onChange={() => handleSalaryChange(range)}
                      className="mr-2"
                    />
                    <label htmlFor={`salary_range_${index}`}>{range}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-base lg:text-lg font-medium">Date Posting</h4>
              <div className="space-y-2">
                {datePostingRange.map((range, index) => (
                  <div key={`${index}-${range}`}>
                    <input
                      type="checkbox"
                      id={`date_posting_range_${index}`}
                      value={range}
                      checked={selectedDatePostingRange === range}
                      onChange={() => setSelectedDatePostingRange(range)}
                      className="mr-2"
                    />
                    <label htmlFor={`date_posting_range_${index}`}>
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-base lg:text-lg font-medium">
                Level Experience
              </h4>
              <div className="space-y-2">
                {levelExperienceRange.map((range, index) => (
                  <div key={`${index}-${range}`}>
                    <input
                      type="checkbox"
                      id={`level_experience_range_${index}`}
                      value={range}
                      checked={selectedLevelExperienceRange === range}
                      onChange={() => handleLevelExperienceChange(range)}
                      className="mr-2"
                    />
                    <label htmlFor={`level_experience_range_${index}`}>
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-base lg:text-lg font-medium">Type Job</h4>
              <div className="space-y-2">
                {typeJobRange.map((range, index) => (
                  <div key={`${index}-${range}`}>
                    <input
                      type="checkbox"
                      id={`type_job_range_${index}`}
                      value={range}
                      checked={selectedTypeJobRange === range}
                      onChange={() => handleTypeJobChange(range)}
                      className="mr-2"
                    />
                    <label htmlFor={`type_job_range_${index}`}>{range}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-base lg:text-lg font-medium">Work Type</h4>
              <div className="space-y-2">
                {workTypeRange.map((range, index) => (
                  <div key={`${index}-${range}`}>
                    <input
                      type="checkbox"
                      id={`work_type_range_${index}`}
                      value={range}
                      checked={selectedWorkTypeRange === range}
                      onChange={() => handleWorkTypeChange(range)}
                      className="mr-2"
                    />
                    <label htmlFor={`work_type_range_${index}`}>{range}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 flex flex-col gap-2">
            <h2 className="font-bold text-xl lg:text-3xl">{totalJobs} Jobs</h2>
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="p-4 shadow-sm flex flex-row gap-3 items-start bg-white rounded-md"
              >
                <img
                  src={`${import.meta.env.VITE_BE_URL}/storage/${
                    job.recruiter.company.logo
                  }`}
                  className="w-16 lg:w-20 h-auto mt-4"
                  alt=""
                />
                <div>
                  <h4 className="text-sm font-normal">
                    {job.recruiter.company.name}
                  </h4>
                  <h3 className="text-base lg:text-lg font-semibold mt-2">
                    {job.title}
                  </h3>
                  <div className="flex justify-between gap-4 mt-2">
                    <div className="flex gap-1 justify-center items-center">
                      <TimeIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {FormatString(job.employment_type)}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <DollarIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {FormatCurrency(job.min_salary)} -{" "}
                        {FormatCurrency(job.max_salary)}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <PinPointJobIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">{job.location}</span>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <CalendarJobIcon className="w-4 h-4" />
                      <span className="text-xs lg:text-sm">
                        {job.created_at}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm lg:text-base">{job.description}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/jobs/${job.slug}`}
                      className="mt-4 bg-blue-700 text-white py-1.5 px-4 rounded-md"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center my-4">
              <Pagination
                showControls
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
