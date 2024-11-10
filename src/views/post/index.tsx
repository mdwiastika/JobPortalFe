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

export default function PostIndex() {
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [selectedDatePostingRange, setSelectedDatePostingRange] = useState("");
  const [selectedLevelExperienceRange, setSelectedLevelExperienceRange] =
    useState("");
  const [selectedTypeJobRange, setSelectedTypeJobRange] = useState("");
  const [selectedWorkTypeRange, setSelectedWorkTypeRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    console.log(
      `Salary: ${selectedSalaryRange}, Date Posting: ${selectedDatePostingRange}, Level Experience: ${selectedLevelExperienceRange}, Type Job: ${selectedTypeJobRange}, Work Type: ${selectedWorkTypeRange}`
    );
  }, [
    selectedSalaryRange,
    selectedDatePostingRange,
    selectedLevelExperienceRange,
    selectedTypeJobRange,
    selectedWorkTypeRange,
  ]);
  useEffect(() => {
    console.log(`Current Page: ${currentPage}`);
  }, [currentPage]);
  const levelExperienceRange = ["Beginner", "Medium", "Expert"];
  const typeJobRange = ["Full-time", "Part-time", "Contract", "Internship"];
  const workTypeRange = ["Remote", "On-site", "Hybrid"];
  const jobPostings = [
    {
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
    {
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
    {
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
    {
      id: 4,
      recruiter_id: 126,
      title: "Data Scientist",
      slug: "data-scientist",
      description:
        "We are looking for a data scientist to help transform complex data into actionable insights. custom data models and algorithms to apply to our datasets while analyzing data to find patterns and predict future trends.",
      requirements: "Experience with Python and machine learning...",
      employment_type: "full_time",
      experience_level: "mid",
      work_type: "hybrid",
      min_salary: 3500000,
      max_salary: 6000000,
      location: "Seattle, WA",
      is_disability: false,
      created_at: "2024-10-15",
      recruiter: {
        user: {
          full_name: "Bob Brown",
          email: "bob@gmail.com",
        },
        company: {
          name: "Data Inc",
          location: "Seattle, WA",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 5,
      recruiter_id: 127,
      title: "DevOps Engineer",
      slug: "devops-engineer",
      description:
        "We are looking for a DevOps engineer to help streamline our development and deployment processes. You will be responsible for implementing automation tools and frameworks to support continuous integration and deployment pipelines.",
      requirements: "Experience with AWS and CI/CD pipelines...",
      employment_type: "full_time",
      experience_level: "senior",
      work_type: "on_site",
      min_salary: 4000000,
      max_salary: 7000000,
      location: "Chicago, IL",
      is_disability: false,
      created_at: "2024-10-10",
      recruiter: {
        user: {
          full_name: "Charlie Davis",
          email: "charlie@gmail.com",
        },
        company: {
          name: "Cloud Services",
          location: "Chicago, IL",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 6,
      recruiter_id: 128,
      title: "Product Manager",
      slug: "product-manager",
      description:
        "We are looking for a product manager to drive the development and launch of innovative products. product development process from conception to launch while conducting market research and competitive analysis.",
      requirements: "Experience with product lifecycle management...",
      employment_type: "full_time",
      experience_level: "mid",
      work_type: "remote",
      min_salary: 4500000,
      max_salary: 7500000,
      location: "Boston, MA",
      is_disability: false,
      created_at: "2024-10-05",
      recruiter: {
        user: {
          full_name: "Diana Evans",
          email: "diana@gmail.com",
        },
        company: {
          name: "Product Co",
          location: "Boston, MA",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 7,
      recruiter_id: 129,
      title: "UX Designer",
      slug: "ux-designer",
      description:
        "We are looking for a UX designer to create innovative and intuitive user experiences for our products. You will be responsible for. product managers and developers to ensure the technical feasibility of UI/UX designs while conducting usability testing.",
      requirements: "Experience with user research and design tools...",
      employment_type: "full_time",
      experience_level: "junior",
      work_type: "hybrid",
      min_salary: 3000000,
      max_salary: 5000000,
      location: "Los Angeles, CA",
      is_disability: false,
      created_at: "2024-10-01",
      recruiter: {
        user: {
          full_name: "Eve Foster",
          email: "eve@gmail.com",
        },
        company: {
          name: "Design Studio",
          location: "Los Angeles, CA",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 8,
      recruiter_id: 130,
      title: "QA Engineer",
      slug: "qa-engineer",
      description:
        "We are looking for a QA engineer to ensure the quality of our software products. The role includes creating detailed test plans and test cases while participating in product design reviews to provide input on requirements.",
      requirements: "Experience with automated testing tools...",
      employment_type: "contract",
      experience_level: "mid",
      work_type: "on_site",
      min_salary: 2500000,
      max_salary: 4000000,
      location: "Denver, CO",
      is_disability: false,
      created_at: "2024-09-25",
      recruiter: {
        user: {
          full_name: "Frank Green",
          email: "frank@gmail.com",
        },
        company: {
          name: "QA Solutions",
          location: "Denver, CO",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 9,
      recruiter_id: 131,
      title: "Marketing Specialist",
      slug: "marketing-specialist",
      description:
        "We are looking for a marketing specialist to develop and implement marketing strategies for our company. trends and competitor activities while monitoring campaign performance and ROI through various analytics tools.",
      requirements: "Experience with digital marketing and SEO...",
      employment_type: "full_time",
      experience_level: "junior",
      work_type: "remote",
      min_salary: 2000000,
      max_salary: 3500000,
      location: "Miami, FL",
      is_disability: false,
      created_at: "2024-09-20",
      recruiter: {
        user: {
          full_name: "Grace Harris",
          email: "grace@gmail.com",
        },
        company: {
          name: "Marketing Experts",
          location: "Miami, FL",
          logo: "/jobs/brand.svg",
        },
      },
    },
    {
      id: 10,
      recruiter_id: 132,
      title: "HR Manager",
      slug: "hr-manager",
      description:
        "We are looking for an HR manager to oversee all aspects of human resources practices and processes. The role includes managing the recruitment lifecycle and providing guidance to managers while ensuring compliance with labor laws and company policies.",
      requirements: "Experience with HR policies and procedures...",
      employment_type: "full_time",
      experience_level: "senior",
      work_type: "on_site",
      min_salary: 5000000,
      max_salary: 8000000,
      location: "Houston, TX",
      is_disability: false,
      created_at: "2024-09-15",
      recruiter: {
        user: {
          full_name: "Henry Jackson",
          email: "henry@gmail.com",
        },
        company: {
          name: "HR Solutions",
          location: "Houston, TX",
          logo: "/jobs/brand.svg",
        },
      },
    },
  ];
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
            <h2 className="font-bold text-xl lg:text-3xl">3612 Jobs</h2>
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="p-4 shadow-sm flex flex-row gap-3 items-start bg-white rounded-md"
              >
                <img
                  src={job.recruiter.company.logo}
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
                total={10}
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
