import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = {
    id: 1,
    recruiter_id: 123,
    title: "Software Engineer",
    slug: slug,
    description: "We are looking for a skilled software engineer...",
    requirements: "Bachelor's degree in Computer Science...",
    employment_type: "full-time",
    experience_level: "mid",
    work_type: "remote",
    min_salary: 60000,
    max_salary: 90000,
    location: "New York, NY",
    is_disability: false,
  };
  return (
    <div>
      <div className="bg-slate-200 flex justify-between items-center">
        <h2>Job Details: {post.title} </h2>
      </div>
    </div>
  );
}
