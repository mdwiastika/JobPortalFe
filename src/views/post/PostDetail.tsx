import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import FeBookmark from "../../components/SavedJobs";
import ArrowRight from "../../components/ArrowRight";
import MapIcon from "../../components/MapIcon";
import CalendarIcon from "../../components/CalendarIcon";
import LevelIcon from "../../components/LevelIcon";
import Person from "../../components/Person";
import ShareIcon from "../../components/ShareIcon";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = {
    id: 1,
    recruiter_id: 123,
    title: "Software Engineer",
    slug: slug,
    description: "We are looking for a skilled software engineer...",
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
  };
  return (
    <div>
      <div className="bg-slate-100">
        <div className="flex justify-between items-center container mx-auto p-4">
          <h2>Job Details</h2>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link to={"/"}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={"/jobs"}>Jobs</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{post.title}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div>
        <div className="flex justify-between lg:items-center container mx-auto mt-4 py-4 gap-6 lg:gap3 flex-col lg:flex-row px-2">
          <div className="lg:w-2/3">
            <div className="flex justify-start items-center gap-2">
              <img
                src={post.recruiter.company.logo}
                alt=""
                className="w-9 h-auto"
              />
              <div>
                <h2 className="text-lg font-medium">{post.title}</h2>
                <div className="flex justify-start items-center gap-3">
                  <span>at {post.recruiter.company.name}</span>
                  <div className="bg-blue-600 text-white py-1 px-3 rounded-lg">
                    {formatString(post.employment_type)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-start items-center gap-3">
            <button className="bg-[#E7F0FA] py-1 px-1 lg:py-3 lg:px-3 rounded-md w-auto">
              <FeBookmark />
            </button>
            <button className="py-1 px-3 lg:py-3 lg:px-5 bg-blue-700 text-white flex justify-center items-center gap-2">
              <span>Apply Now</span> <ArrowRight />
            </button>
          </div>
        </div>
        <div className="mt-4 container mx-auto p-2">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 lg:col-span-3 bg-gray-100 p-2 lg:p-4">
              <h3 className="font-semibold text-sm">Job Description</h3>
              <p className="text-sm text-justify">
                {post.description}
                Lorem ipsum dolor sit amete qui perspiciatis ullam nemo
                corporis. Quae nisi atque, modi iste tempora provident cum
                deleniti exercitationem quod alias, totam nihil quidem aliquid
                voluptatum dicta, maiores suscipit unde quibusdam est? Dicta ab
                expedita, repudiandae commodi provident rem saepe culpa modi id
                eligendi aut ducimus quas nesciunt alias eum? Libero in
                architecto hic quam voluptates maxime fugit, quia aliquid earum
                enim veritatis officia perferendis cupiditate corporis aperiam
                repellendus saepe qui. Molestias, porro? Dolor sed corrupti
                sapiente architecto, assumenda, aut nesciunt rem magnam omnis
                nemo neque odit amet maxime! Illo earum expedita totam?
                Similique corporis, ab quas fuga eum illo praesentium libero
                harum molestias tempora voluptates iusto, totam earum sit.
                Reprehenderit ut quasi maxime libero fuga eveniet est culpa
                nostrum quibusdam?
              </p>
              <h3 className="font-semibold text-sm mt-4">Requirements</h3>
              <p className="text-sm text-justify">
                <ul className="list-disc mx-4">
                  <li className="my-1">{post.requirements}</li>
                  <li className="my-1">
                    Proven experience as a Software Engineer
                  </li>
                  <li className="my-1">
                    Experience with software design and development
                  </li>
                  <li className="my-1">
                    Knowledge of coding languages (e.g., C++, Java, JavaScript)
                  </li>
                  <li className="my-1">
                    Experience with databases and Object-Relational Mapping
                    (ORM) frameworks
                  </li>
                  <li className="my-1">Understanding of Agile methodologies</li>
                  <li className="my-1">
                    Excellent troubleshooting and communication skills
                  </li>
                  <li className="my-1">Attention to detail</li>
                  <li className="my-1">
                    Experience with version control systems (e.g., Git)
                  </li>
                  <li className="my-1">
                    Ability to work independently and in a team
                  </li>
                  <li className="my-1">Strong problem-solving skills</li>
                </ul>
              </p>

              <h3 className="font-semibold text-sm mt-4">Benefits</h3>
              <ul className="list-disc mx-4">
                <li className="my-1">Health Insurance</li>
                <li className="my-1">Dental Insurance</li>
                <li className="my-1">Vision Insurance</li>
                <li className="my-1">Paid Time Off</li>
                <li className="my-1">Flexible Schedule</li>
              </ul>
            </div>
            <div className="col-span-5 lg:col-span-2">
              <div className="border-2 py-4 px-4 flex justify-evenly items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-base">Salary (IDR)</h3>
                  <div className="">
                    <span className="text-green-700 font-medium">
                      {post.min_salary.toLocaleString()} -{" "}
                      {post.max_salary.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-slate-700">Mounthly Salary</span>
                </div>
                <span className="w-[2px] h-16 bg-slate-700"></span>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-base">Job Location</h3>
                  <MapIcon />
                  <span className="text-slate-700">{post.location}</span>
                </div>
              </div>
              <div className="mt-4 border-2 py-4 px-4">
                <h3 className="font-semibold text-base">Job Overview</h3>
                <div className="mt-4 flex justify-evenly items-center gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <CalendarIcon />
                    <span className="text-slate-700">Job Posted</span>
                    <span className="font-semibold">{post.created_at}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <LevelIcon />
                    <span className="text-slate-700">Job Level</span>
                    <span className="font-semibold">
                      {formatString(post.experience_level)} Level
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Person />
                    <span className="text-slate-700">Recuirter</span>
                    <span className="font-semibold">
                      {post.recruiter.user.full_name}
                    </span>
                  </div>
                </div>
                <div className="border-t-2 mt-4">
                  <h3 className="font-semibold text-base">Share this job</h3>
                  <div className="mt-4 text-[#0A65CC] bg-[#E7F0FA] w-40 flex justify-center items-center py-1 px-3 gap-2">
                    <ShareIcon />
                    <span className="font-medium text-sm">Copy Links</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function formatString(input: string) {
  return input
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}
