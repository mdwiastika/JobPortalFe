import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import FeBookmark from "../../components/SavedJobs";
import ArrowRight from "../../components/ArrowRight";
import MapIcon from "../../components/MapIcon";
import CalendarIcon from "../../components/CalendarIcon";
import LevelIcon from "../../components/LevelIcon";
import Person from "../../components/Person";
import ShareIcon from "../../components/ShareIcon";
import CoverLetterIcon from "../../components/CoverLetter";
import ResumeIcon from "../../components/Resume";
import { useEffect, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  interface FormApply {
    cover_letter: "";
    resume: "";
  }
  interface FormReview {
    review: string;
    star: number;
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resume, setResume] = useState<File>();
  const [coverLetter, setCoverLetter] = useState<File>();
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
    skiils: ["Java", "C++", "JavaScript"],
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
  const reviews = [
    {
      star: 5,
      review: "Great company to work with!",
      user: {
        full_name: "John Doe",
        email: "johndoe@gmail.com",
      },
    },
    {
      star: 4,
      review: "Good company to work with!",
      user: {
        full_name: "Jane Doe",
        email: "janedoe@gmail.com",
      },
    },
    {
      star: 3,
      review: "Average company to work with!",
      user: {
        full_name: "Budi sudarsono",
        email: "budisurarsono@gmail.com",
      },
    },
    {
      star: 2,
      review: "Bad company to work with!",
      user: {
        full_name: "Andi Hermawan",
        email: "andihermawan@gmail.com",
      },
    },
  ];

  const [submitMessage, setSubmitMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const handleResumeFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.currentTarget.files?.[0];
    if (selectedFile) {
      setResume(selectedFile);
    }
  };
  const handleCoverLetterFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.currentTarget.files?.[0];
    if (selectedFile) {
      setCoverLetter(selectedFile);
    }
  };
  const reviewHandler = async (
    values: FormReview,
    { setSubmitting, resetForm }: FormikHelpers<FormReview>
  ) => {
    try {
      const response = {
        status: 200,
        data: values,
        file: [
          {
            resume: resume,
            cover_letter: coverLetter,
          },
        ],
      };
      if (response.status == 200) {
        setReviewMessage("Review successful!");
        resetForm();
      } else {
        setReviewMessage("Review failed! Please try again.");
      }
    } catch (error) {
      setReviewMessage("Review failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  const applyHandler = async (
    values: FormApply,
    { setSubmitting, resetForm }: FormikHelpers<FormApply>
  ) => {
    console.log("oke");
    try {
      const response = { status: 200, data: values };
      if (response.status == 200) {
        setSubmitMessage("Application successful!");
        resetForm();
        console.log("testt");
      } else {
        setSubmitMessage("Application failed! Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Application failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            <Tooltip showArrow={true} content="Add to bookmark" color="primary">
              <button className="bg-[#E7F0FA] py-1 px-1 lg:py-2 lg:px-2 rounded-md w-auto">
                <FeBookmark />
              </button>
            </Tooltip>
            <Button
              onPress={onOpen}
              className="py-1 px-3 lg:py-3 lg:px-5 bg-blue-700 text-white flex justify-center items-center gap-2"
            >
              <span>Apply Now</span> <ArrowRight />
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Apply for Work
                    </ModalHeader>
                    <ModalBody>
                      <Formik
                        initialValues={{
                          cover_letter: "",
                          resume: "",
                        }}
                        onSubmit={applyHandler}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="mt-4">
                              <Field
                                type="file"
                                className="block w-full py-2 rounded-md"
                                name="cover_letter"
                                as={InputForm}
                                label="Cover Letter"
                                autoFocus
                                endContent={
                                  <CoverLetterIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                onChange={handleCoverLetterFileChange}
                                required
                              ></Field>
                            </div>
                            <div className="mt-4">
                              <Field
                                type="file"
                                className="block w-full py-2 rounded-md"
                                name="resume"
                                as={InputForm}
                                label="Resume"
                                endContent={
                                  <ResumeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                onChange={handleResumeFileChange}
                                required
                              ></Field>
                            </div>
                            <div>
                              <p>{submitMessage && submitMessage}</p>
                            </div>
                            <div className="mt-4 flex justify-end gap-2 items-center">
                              <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                              >
                                Close
                              </Button>
                              <button
                                color="primary"
                                className="py-2 px-5 bg-blue-600 text-white rounded-xl"
                                disabled={isSubmitting}
                                type="submit"
                              >
                                Apply!
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
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
              <div className="text-sm text-justify">
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
              </div>

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
                  <h3 className="font-semibold text-base">
                    Skill Requirements
                  </h3>
                  <div className="mt-6 text-sm grid grid-flow-col auto-cols-max gap-2">
                    {post.skiils.map((skill, index) => (
                      <div key={`${index}-${skill}`}>
                        <span
                          className={`text-blue-700 bg-blue-700/20 rounded-full py-1 px-3 group-hover:text-blue-700 group-hover:bg-white`}
                        >
                          {skill}
                        </span>
                      </div>
                    ))}
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
      <div className="container mx-auto mt-4">
        <h2 className="text-lg lg:text-base font-semibold mx-2">Reviews</h2>
        <div className="">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 lg:col-span-3 bg-slate-100/60 p-2 lg:p-4">
              <h3 className="font-semibold text-base">Write a Review</h3>
              <Formik
                initialValues={{ review: "", star: rating }}
                onSubmit={reviewHandler}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mt4">
                      <Rating
                        value={rating}
                        onChange={setRating}
                        className="max-w-40"
                      />
                    </div>
                    <div className="mt-4">
                      <Field
                        type="text"
                        className="block w-full py-2 rounded-md"
                        name="review"
                        as={InputForm}
                        label="Review"
                        autoFocus
                        required
                      ></Field>
                      <Field
                        type="hidden"
                        className="block w-full py-2 rounded-md"
                        name="star"
                        value={rating}
                        label="Star"
                        required
                      ></Field>
                    </div>
                    <div>
                      <p>{reviewMessage && reviewMessage}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 items-center">
                      <button
                        className="py-2 px-5 bg-blue-600 text-white rounded-xl"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-base mx-2">All Reviews</h3>
          <div className="grid grid-cols-5 gap-2">
            {reviews.map((review, index) => (
              <div
                key={`${index}-${review.user.full_name}`}
                className="col-span-5 lg:col-span-3 bg-slate-100/60 p-2 lg:p-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold">{review.user.full_name}</h4>
                  <div className="flex items-center gap-2">
                    <Rating value={review.star} readOnly className="max-w-24" />
                    <span>{review.star}</span>
                  </div>
                </div>
                <p className="text-sm text-justify">{review.review}</p>
              </div>
            ))}
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
function InputForm(props: { label: string; type: string }) {
  return <Input {...props} variant="bordered" />;
}
