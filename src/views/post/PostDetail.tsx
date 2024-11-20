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
import { Link, useNavigate, useParams } from "react-router-dom";
import FeBookmark from "../../components/SavedJobs";
import ArrowRight from "../../components/ArrowRight";
import MapIcon from "../../components/MapIcon";
import CalendarIcon from "../../components/CalendarIcon";
import LevelIcon from "../../components/LevelIcon";
import Person from "../../components/Person";
import ShareIcon from "../../components/ShareIcon";
import CoverLetterIcon from "../../components/CoverLetter";
import { ChangeEvent, useEffect, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import axiosInstance from "src/axiosInstance";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  interface FormApply {
    cover_letter: "";
    resume: "";
    job_posting_id: number;
  }
  interface FormReview {
    review_text: string;
    rating: number;
  }
  interface JobPosting {
    id: number;
    title: string;
    description: string;
    employment_type: string;
    experience_level: string;
    work_type: string;
    min_salary: number;
    max_salary: number;
    requirements: string;
    job_categories: [
      {
        id: number;
        category_name: string;
        slug_category: string;
      }
    ];
    slug: string;
    date_post: string;
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
    skills: [
      {
        id: number;
        skill_name: string;
      }
    ];
    location: string;
    created_at: string;
  }
  interface Review {
    id: number;
    rating: number;
    review_text: string;
    user: {
      full_name: string;
      email: string;
    };
  }
  interface SaveJob {
    id: number;
    job_seeker_id: number;
    job_posting_id: number;
  }
  interface CustomChangeEvent extends ChangeEvent<HTMLInputElement> {
    currentTarget: HTMLInputElement & {
      files: FileList;
    };
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [post, setPost] = useState<JobPosting>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [saveJob, setSaveJob] = useState<SaveJob>();
  const [submitMessage, setSubmitMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/user/job-postings/${slug}`);
        const responseData = response.data;
        if (responseData.status == "success") {
          setPost(responseData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/user/reviews`, {
          params: {
            job_posting_id: post?.id,
          },
        });
        const responseData = response.data;
        if (responseData.status == "success") {
          setReviews(
            responseData.data.map((item: Review) => ({
              id: item.id,
              rating: item.rating,
              review_text: item.review_text,
              user: {
                full_name: item.user.full_name,
                email: item.user.email,
              },
            }))
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaveJob = async () => {
      try {
        const response = await axiosInstance.get(`/user/save-jobs`, {
          params: {
            job_posting_id: post?.id,
          },
        });
        const responseData = response.data;
        if (responseData.status == "success") {
          setSaveJob(responseData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    fetchReviews();
    fetchSaveJob();
  }, [slug, post?.id]);
  const [rating, setRating] = useState(0);
  const reviewHandler = async (
    values: FormReview,
    { setSubmitting, resetForm }: FormikHelpers<FormReview>
  ) => {
    try {
      const response = await axiosInstance.post(`/user/reviews`, {
        job_posting_id: post?.id,
        review_text: values.review_text,
        rating: rating,
      });
      const responseData = response.data;
      if (responseData.status == "success") {
        setReviewMessage("Review successful!");
        setReviews([
          ...reviews,
          {
            id: responseData.data.id,
            rating: responseData.data.rating,
            review_text: responseData.data.review_text,
            user: {
              full_name: responseData.data.user.full_name,
              email: responseData.data.user.email,
            },
          },
        ]);
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
  const savedJobsHandler = async () => {
    try {
      if (saveJob) {
        const response = await axiosInstance.delete(
          `/user/save-jobs/${saveJob.id}`
        );
        const responseData = response.data;
        if (responseData.status == "success") {
          setSaveJob(undefined);
        }
      } else {
        const response = await axiosInstance.post(`/user/save-jobs`, {
          job_posting_id: post?.id,
        });
        const responseData = response.data;
        if (responseData.status == "success") {
          setSaveJob(responseData.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const applyHandler = async (
    values: FormApply,
    { setSubmitting, resetForm }: FormikHelpers<FormApply>
  ) => {
    try {
      const formData = new FormData();
      if (resume) {
        formData.append("resume", resume);
      }
      if (coverLetter) {
        formData.append("cover_letter", coverLetter);
      }
      formData.append("job_posting_id", values.job_posting_id.toString());
      const response = await axiosInstance.post(
        `/user/job-applications`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      if (responseData.status == "success") {
        setSubmitMessage("Application successful!");
        resetForm();
      } else {
        setSubmitMessage("Application failed! Please try again.");
      }
    } catch (error) {
      console.error("Failed to apply:", error);
    }
    setSubmitting(false);
  };
  const resumeHandler = (e: CustomChangeEvent): void => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setResume(file);
    document.getElementById("logo")!.setAttribute("src", previewUrl);
  };
  const coverLetterHandler = (e: CustomChangeEvent): void => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setCoverLetter(file);
    document.getElementById("logo")!.setAttribute("src", previewUrl);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {post && (
        <>
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
                <Tooltip
                  showArrow={true}
                  content={
                    saveJob ? "Remove to Saved Jobs" : "Saved from Saved Jobs"
                  }
                  color="primary"
                >
                  <button
                    onClick={savedJobsHandler}
                    className="bg-[#E7F0FA] py-1 px-1 lg:py-2 lg:px-2 rounded-md w-auto"
                  >
                    <FeBookmark fill={`#0A65CC`} />
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
                              job_posting_id: post.id,
                            }}
                            onSubmit={applyHandler}
                          >
                            {({ isSubmitting }) => (
                              <Form>
                                <div className="border-2 border-gray-300 rounded-xl py-2 px-2">
                                  <label htmlFor="resume" className="text-xs">
                                    Resume
                                  </label>
                                  <Field
                                    label="Resume"
                                    type="file"
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                      if (
                                        e.currentTarget.files &&
                                        e.currentTarget.files[0]
                                      ) {
                                        resumeHandler(e as CustomChangeEvent);
                                      }
                                    }}
                                    name="resume"
                                    endContent={
                                      <CoverLetterIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    className="mt-1 block w-full text-gray-700 text-sm
                 file:mr-4 file:py-0 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-gray-700
                 hover:file:bg-blue-100"
                                  />
                                </div>
                                <div className="border-2 border-gray-300 rounded-xl py-2 px-2 mt-2">
                                  <label htmlFor="resume" className="text-xs">
                                    Cover Letter
                                  </label>
                                  <Field
                                    label="Cover Letter"
                                    type="file"
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                      if (
                                        e.currentTarget.files &&
                                        e.currentTarget.files[0]
                                      ) {
                                        coverLetterHandler(
                                          e as CustomChangeEvent
                                        );
                                      }
                                    }}
                                    name="cover_letter"
                                    endContent={
                                      <CoverLetterIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    className="mt-1 block w-full text-gray-700 text-sm
                 file:mr-4 file:py-0 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-gray-700
                 hover:file:bg-blue-100"
                                  />
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
                    deleniti exercitationem quod alias, totam nihil quidem
                    aliquid voluptatum dicta, maiores suscipit unde quibusdam
                    est? Dicta ab expedita, repudiandae commodi provident rem
                    saepe culpa modi id eligendi aut ducimus quas nesciunt alias
                    eum? Libero in architecto hic quam voluptates maxime fugit,
                    quia aliquid earum enim veritatis officia perferendis
                    cupiditate corporis aperiam repellendus saepe qui.
                    Molestias, porro? Dolor sed corrupti sapiente architecto,
                    assumenda, aut nesciunt rem magnam omnis nemo neque odit
                    amet maxime! Illo earum expedita totam? Similique corporis,
                    ab quas fuga eum illo praesentium libero harum molestias
                    tempora voluptates iusto, totam earum sit. Reprehenderit ut
                    quasi maxime libero fuga eveniet est culpa nostrum
                    quibusdam?
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
                        Knowledge of coding languages (e.g., C++, Java,
                        JavaScript)
                      </li>
                      <li className="my-1">
                        Experience with databases and Object-Relational Mapping
                        (ORM) frameworks
                      </li>
                      <li className="my-1">
                        Understanding of Agile methodologies
                      </li>
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
                        <span className="font-semibold">{post.date_post}</span>
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
                        {post.skills.map((skill, index) => (
                          <div key={`${index}-${skill}`}>
                            <span
                              className={`text-blue-700 bg-blue-700/20 rounded-full py-1 px-3 group-hover:text-blue-700 group-hover:bg-white`}
                            >
                              {skill.skill_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t-2 mt-4">
                      <h3 className="font-semibold text-base">
                        Share this job
                      </h3>
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
        </>
      )}
      <div className="container mx-auto mt-4">
        <h2 className="text-lg lg:text-base font-semibold mx-2">Reviews</h2>
        <div className="">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 lg:col-span-3 bg-slate-100/60 p-2 lg:p-4">
              <h3 className="font-semibold text-base">Write a Review</h3>
              <Formik
                initialValues={{ review_text: "", rating: rating }}
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
                        name="review_text"
                        as={InputForm}
                        label="Review"
                        autoFocus
                        required
                      ></Field>
                      <Field
                        type="hidden"
                        className="block w-full py-2 rounded-md"
                        name="rating"
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
          <div className="grid grid-cols-5 gap-2 py-5">
            {reviews.map((review, index) => (
              <div
                key={`${index}-${review.user.full_name}`}
                className="col-span-5 lg:col-span-3 bg-slate-100/60 p-2 lg:p-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold">{review.user.full_name}</h4>
                  <div className="flex items-center gap-2">
                    <Rating
                      value={review.rating}
                      readOnly
                      className="max-w-24"
                    />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-justify">{review.review_text}</p>
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
