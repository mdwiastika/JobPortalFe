import { ChangeEvent, useState } from "react";
import Sidebar from "../partials/Sidebar";
import { Field, Form, Formik, FormikHelpers } from "formik";
import InputForm from "../../components/InputForm";
import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import FormatString from "../../components/FormatString";
export default function EditProfile() {
  interface EditProfileProps {
    name: string;
    password: string;
  }
  interface JobSeekerProps {
    resume: string;
    phone: string;
    location: string;
    linkedin: string;
    experience_level: string;
  }
  const skiils = [
    {
      id: 1,
      name: "React",
    },
    {
      id: 2,
      name: "Node.js",
    },
    {
      id: 3,
      name: "TypeScript",
    },
    {
      id: 4,
      name: "Express",
    },
    {
      id: 5,
      name: "MongoDB",
    },
    {
      id: 6,
      name: "GraphQL",
    },
    {
      id: 7,
      name: "Apollo",
    },
    {
      id: 8,
      name: "REST API",
    },
    {
      id: 9,
      name: "Next.js",
    },
    {
      id: 10,
      name: "Nest.js",
    },
  ];
  interface SkiilProps {
    skiil: string;
    profiency: string;
  }
  const experienceLevels = [
    { id: "beginner", name: "Beginner" },
    { id: "medium", name: "Medium" },
    { id: "expert", name: "Expert" },
  ];
  const user = {
    full_name: "John Doe",
    password: "password",
    job_seeker: {
      resume: "resume.pdf",
      phone: "1234567890",
      location: "New York",
      linkedin: "https://linkedin.com",
      experience_level: "beginner",
    },
    job_seeker_skiils: [
      {
        id: 1,
        skill: {
          name: "React",
        },
        profiency: "beginner",
      },
      {
        id: 2,
        skill: {
          name: "Node.js",
        },
        profiency: "medium",
      },
      {
        id: 3,
        skill: {
          name: "TypeScript",
        },
        profiency: "expert",
      },
    ],
  };
  const [editProfileMessage, setEditProfileMessage] = useState("");
  const [jobSeekerMessage, setJobSeekerMessage] = useState("");
  const [selectedKeyExperience, setSelectedKeyExperience] = useState(
    user.job_seeker.experience_level
  );
  const [selectedKeySkill, setSelectedKeySkill] = useState("");
  const [selectedKeyProfiency, setSelectedKeyProfiency] = useState("beginner");
  const [skiilMessage, setSkiilMessage] = useState("");
  const [file, setFile] = useState<{
    resume: File | null;
  }>({
    resume: null,
  });
  const handleFileChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        setFile({
          ...file,
          [field]: files[0],
        });
      }
    };
  const editProfileHandler = async (
    values: EditProfileProps,
    { setSubmitting, resetForm }: FormikHelpers<EditProfileProps>
  ) => {
    try {
      const response = { status: 200, data: values };
      if (response.status == 200) {
        setEditProfileMessage("Profile updated successfully!");
        resetForm();
      } else {
        setEditProfileMessage("Profile update failed! Please try again.");
      }
    } catch (error) {
      setEditProfileMessage("Profile update failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  const jobSeekerHandler = async (
    values: JobSeekerProps,
    { setSubmitting, resetForm }: FormikHelpers<JobSeekerProps>
  ) => {
    try {
      const response = { status: 200, data: values };
      if (response.status == 200) {
        setJobSeekerMessage("Profile updated successfully!");
        resetForm();
      } else {
        setJobSeekerMessage("Profile update failed! Please try again.");
      }
    } catch (error) {
      setJobSeekerMessage("Profile update failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  const skiilHandler = async (
    values: SkiilProps,
    { setSubmitting, resetForm }: FormikHelpers<SkiilProps>
  ) => {
    try {
      const response = { status: 200, data: values };
      if (response.status == 200) {
        setSkiilMessage("Skill added successfully!");
        resetForm();
      } else {
        setSkiilMessage("Skill addition failed! Please try again.");
      }
    } catch (error) {
      setSkiilMessage("Skill addition failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  const handleRemoveSkiil = async (id: number) => {
    try {
      const response = { status: 200, data: id };
      if (response.status == 200) {
        setSkiilMessage(`Skill ${id} removed successfully!`);
      } else {
        setSkiilMessage("Skill removal failed! Please try again.");
      }
    } catch (error) {
      setSkiilMessage("Skill removal failed! Please try again.");
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-100/60 py-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        <Sidebar />
        <div className="content bg-white col-span-3 min-h-screen p-2">
          <section id="edit-profile">
            <h2 className="m-6 mb-2 font-semibold">Edit Profile</h2>
            <Formik
              initialValues={{
                name: user.full_name,
                password: "",
              }}
              onSubmit={editProfileHandler}
            >
              {({ isSubmitting }) => (
                <Form className="p-5 pt-0">
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md"
                    name="name"
                    as={InputForm}
                    label="Name"
                    autoFocus
                    required
                  ></Field>
                  <Field
                    type="password"
                    className="block w-full py-2 rounded-md"
                    name="password"
                    as={InputForm}
                    label="Password"
                    required
                  ></Field>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 mt-4"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-center text-green-500">
              {editProfileMessage}
            </div>
          </section>
          <section id="identity">
            <h2 className="m-6 mt-8 mb-2 font-semibold">Your Identity</h2>
            <Formik
              initialValues={{
                resume: "",
                phone: user.job_seeker.phone,
                location: user.job_seeker.location,
                linkedin: user.job_seeker.linkedin,
                experience_level: user.job_seeker.experience_level,
              }}
              onSubmit={jobSeekerHandler}
            >
              {({ isSubmitting }) => (
                <Form className="p-5 pt-0">
                  <Field
                    type="file"
                    className="block w-full py-2 rounded-md"
                    name="resume"
                    as={InputForm}
                    label="Resume"
                    onChange={handleFileChange("resume")}
                    required
                  ></Field>
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md"
                    name="phone"
                    as={InputForm}
                    label="Phone"
                    required
                  ></Field>
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md"
                    name="location"
                    as={InputForm}
                    label="Location"
                    required
                  ></Field>
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md"
                    name="linkedin"
                    as={InputForm}
                    label="LinkedIn"
                    required
                  ></Field>
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md bg-white"
                    name="experience_level"
                    as={SelectForm}
                    items={experienceLevels}
                    label="Experience Level"
                    selectedKey={selectedKeyExperience}
                    onSelectionChange={setSelectedKeyExperience}
                    required
                  ></Field>
                  {jobSeekerMessage && (
                    <div className="text-center text-green-500">
                      {jobSeekerMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 mt-4"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>
          </section>

          <section id="table">
            <h2 className="p-8 px-4 pb-0 font-semibold">My Skills</h2>
            <Formik
              initialValues={{
                skiil: "",
                profiency: "",
              }}
              onSubmit={skiilHandler}
            >
              {({ isSubmitting }) => (
                <Form className="p-5 pt-0">
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md"
                    name="skiil"
                    as={SelectForm}
                    items={skiils}
                    label="Skill"
                    selectedKey={selectedKeySkill}
                    onSelectionChange={setSelectedKeySkill}
                    required
                  ></Field>
                  <Field
                    type="text"
                    className="block w-full py-2 rounded-md bg-white"
                    name="profiency"
                    as={SelectForm}
                    items={experienceLevels}
                    label="Profiency"
                    selectedKey={selectedKeyProfiency}
                    onSelectionChange={setSelectedKeyProfiency}
                    required
                  ></Field>
                  {skiilMessage && (
                    <div className="text-center text-green-500">
                      {skiilMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 mt-4"
                    disabled={isSubmitting}
                  >
                    Add Skill
                  </button>
                </Form>
              )}
            </Formik>
            <Table aria-label="Example static collection table" className="p-4">
              <TableHeader>
                <TableColumn>Skill</TableColumn>
                <TableColumn>Profiency</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {user.job_seeker_skiils.map((skill) => (
                  <TableRow key={skill.skill.name}>
                    <TableCell>{skill.skill.name}</TableCell>
                    <TableCell>{FormatString(skill.profiency)}</TableCell>
                    <TableCell>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveSkiil(skill.id)}
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </div>
    </div>
  );

  type SelectItemType = {
    id: string;
    name: string;
  };
  interface SelectFormProps<T> {
    items: T[];
    label: string;
    placeholder?: string;
    className?: string;
    selectedKey?: string;
    onSelectionChange: (key: string) => void;
  }
  function SelectForm<T extends SelectItemType>({
    items,
    label,
    placeholder,
    selectedKey,
    onSelectionChange,
    className,
  }: SelectFormProps<T>) {
    return (
      <Select
        label={label}
        defaultSelectedKeys={[selectedKey || ""]}
        onChange={(e) => onSelectionChange(e.target.value)}
        selectedKeys={[selectedKey || ""]}
        placeholder={placeholder}
        className={className}
      >
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.name}
          </SelectItem>
        ))}
      </Select>
    );
  }
}
