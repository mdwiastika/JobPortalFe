import { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Popup from "reactjs-popup";
import ReactPaginate from "react-paginate";
import axiosInstance from "src/axiosInstance";
import EditIcon from "src/components/EditIcon";
import RemoveIcon from "src/components/RemoveIcon";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Input } from "@nextui-org/react";
import { Box, Button, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Card } from "@mui/material";
import TextAreaForm from "src/components/TextAreaForm";
import SelectForm from "src/components/SelectFormNext";
import FormatCurrency from "src/components/FormatCurrency";
import MultiSelectForm from "src/components/MultiSelectFormNext";

interface TableData {
  id: number;
  recruiter_id: number;
  title: string;
  description: string;
  requirements: string;
  employment_type: string;
  experience_level: string;
  work_type: string;
  min_salary: number;
  max_salary: number;
  location: string;
  is_disability: boolean;
  skills: { id: string; name: string }[];
  job_categories: { id: string; name: string }[];
}

interface EditTableDataFormProps {
  data: TableData;
  onSubmit: (updatedData: TableData) => void;
}
interface CreateTableDataFormProps {
  onSubmit: (updatedData: TableData) => void;
}
const JobPostsTable = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tableDatas, setTableDatas] = useState<TableData[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedTableData, setSelectedTableData] = useState<TableData | null>(
    null
  );
  const [recruiters, setRecruiters] =
    useState<{ id: number; name: string }[]>();
  const [skills, setSkills] = useState<{ id: number; name: string }[]>();
  const [jobCategories, setJobCategories] =
    useState<{ id: number; name: string }[]>();

  const employmentTypes = [
    { id: "full_time", name: "Full Time" },
    { id: "part_time", name: "Part Time" },
    { id: "contract", name: "Contract" },
    { id: "internship", name: "Internship" },
  ];
  const experienceLevels = [
    { id: "beginner", name: "Beginner" },
    { id: "medium", name: "Medium" },
    { id: "expert", name: "Expert" },
  ];
  const workTypes = [
    { id: "remote", name: "Remote" },
    { id: "on_site", name: "On Site" },
    { id: "hybrid", name: "Hybrid" },
  ];
  const isDisabilities = [
    { id: "1", name: "Yes" },
    { id: "0", name: "No" },
  ];
  const fetchSkills = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/skills/job-post");
      const responseData = response.data;
      console.log(responseData);
      setSkills(
        responseData.data.map((skill: { id: number; skill_name: string }) => ({
          id: skill.id,
          name: skill.skill_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Failed to fetch skills.");
    }
  };
  const fetchJobCategories = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/job-categories/job-post");
      const responseData = response.data;
      console.log(responseData);
      setJobCategories(
        responseData.data.map(
          (jobCategory: { id: number; category_name: string }) => ({
            id: jobCategory.id,
            name: jobCategory.category_name,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching job categories:", error);
      toast.error("Failed to fetch job categories.");
    }
  };
  const fetchRecruiters = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/recruiters");
      const responseData = response.data;
      console.log(responseData);
      setRecruiters(
        responseData.data.map(
          (recruiter: { id: number; full_name: string }) => ({
            id: recruiter.id,
            name: recruiter.full_name,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      toast.error("Failed to fetch recruiters.");
    }
  };
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const handleCreateOpen = () => setIsCreatePopupOpen(true);
  const handleCreateClose = () => setIsCreatePopupOpen(false);
  const title = "Job Posts";
  const url = "job-posts";
  const singleTitle = "Job Post";
  const tableDataPerPage = 5;
  const fetchDatas = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/${url}`);
      const responseData = response.data;
      const sampleData: TableData[] = responseData.data;
      setTableDatas(sampleData);
      setFilteredTableData(sampleData);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
      toast.error(`Failed to fetch ${title}.`);
    }
  };
  const EditDataForm = ({ data }: EditTableDataFormProps): JSX.Element => {
    console.log(data);
    const [editMessage, setEditMessage] = useState("");
    const handleEditSubmit = async (
      values: TableData,
      { setSubmitting, resetForm }: FormikHelpers<TableData>
    ) => {
      try {
        const formData = new FormData();
        formData.append("recruiter_id", values.recruiter_id.toString());
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("requirements", values.requirements);
        formData.append("employment_type", values.employment_type);
        formData.append("experience_level", values.experience_level);
        formData.append("work_type", values.work_type);
        formData.append("min_salary", values.min_salary.toString());
        formData.append("max_salary", values.max_salary.toString());
        formData.append("location", values.location);
        formData.append("is_disability", values.is_disability ? "1" : "0");
        formData.append("skills", JSON.stringify(values.skills));
        formData.append(
          "job_categories",
          JSON.stringify(values.job_categories)
        );
        const response = await axiosInstance.post(
          `/${url}/${data.id}?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const responseData = response.data;
        console.log(responseData);
        if (responseData.status == "success") {
          Swal.fire("Success!", responseData.message, "success");
          resetForm();
          setSelectedTableData(null);
          setTableDatas(
            tableDatas.map((prevData) =>
              prevData.id === data.id
                ? {
                    ...prevData,
                    recruiter_id: responseData.data.recruiter_id,
                    title: responseData.data.title,
                    description: responseData.data.description,
                    requirements: responseData.data.requirements,
                    employment_type: responseData.data.employment_type,
                    experience_level: responseData.data.experience_level,
                    work_type: responseData.data.work_type,
                    min_salary: responseData.data.min_salary,
                    max_salary: responseData.data.max_salary,
                    location: responseData.data.location,
                    is_disability: responseData.data.is_disability,
                    skills: responseData.data.skills,
                    job_categories: responseData.data.job_categories,
                  }
                : prevData
            )
          );
          setFilteredTableData(
            filteredTableData.map((prevData) =>
              prevData.id === data.id
                ? {
                    ...prevData,
                    recruiter_id: responseData.data.recruiter_id,
                    title: responseData.data.title,
                    description: responseData.data.description,
                    requirements: responseData.data.requirements,
                    employment_type: responseData.data.employment_type,
                    experience_level: responseData.data.experience_level,
                    work_type: responseData.data.work_type,
                    min_salary: responseData.data.min_salary,
                    max_salary: responseData.data.max_salary,
                    location: responseData.data.location,
                    is_disability: responseData.data.is_disability,
                    skills: responseData.data.skills,
                    job_categories: responseData.data.job_categories,
                  }
                : prevData
            )
          );
        } else {
          setEditMessage(responseData.message);
        }
      } catch (error) {
        setEditMessage(`${singleTitle} update failed! Please try again.`);
        console.log(error);
      }
      setSubmitting(false);
    };
    return (
      <Formik
        initialValues={{
          id: data.id,
          recruiter_id: data.recruiter_id,
          title: data.title,
          description: data.description,
          requirements: data.requirements,
          employment_type: data.employment_type,
          experience_level: data.experience_level,
          work_type: data.work_type,
          min_salary: data.min_salary,
          max_salary: data.max_salary,
          location: data.location,
          is_disability: data.is_disability,
          skills: data.skills,
          job_categories: data.job_categories,
        }}
        onSubmit={handleEditSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4 bg-white text-gray-800">
            <div className="mb-4">
              <Field
                type="text"
                label="Recruiter"
                as={SelectForm}
                items={recruiters}
                selectedKey={values.recruiter_id.toString()}
                onSelectionChange={(selectedRecruiter: string) => {
                  setFieldValue("recruiter_id", selectedRecruiter);
                }}
                name="recruiter_id"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Title"
                as={InputForm}
                name="title"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Description"
                as={TextAreaForm}
                name="description"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Requirements"
                as={TextAreaForm}
                name="requirements"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Employment Type"
                as={SelectForm}
                items={employmentTypes}
                selectedKey={values.employment_type}
                onSelectionChange={(selectedEmploymentType: string) => {
                  setFieldValue("employment_type", selectedEmploymentType);
                }}
                name="employment_type"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Experience Level"
                as={SelectForm}
                items={experienceLevels}
                selectedKey={values.experience_level}
                onSelectionChange={(selectedExperienceLevel: string) => {
                  setFieldValue("experience_level", selectedExperienceLevel);
                }}
                name="experience_level"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Work Type"
                as={SelectForm}
                items={workTypes}
                selectedKey={values.work_type}
                onSelectionChange={(selectedWorkType: string) => {
                  setFieldValue("work_type", selectedWorkType);
                }}
                name="work_type"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="number"
                label="Minimum Salary"
                as={InputForm}
                name="min_salary"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="number"
                label="Maximum Salary"
                as={InputForm}
                name="max_salary"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Location"
                as={InputForm}
                name="location"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="checkbox"
                label="Is Disability"
                as={SelectForm}
                items={isDisabilities}
                selectedKey={values.is_disability ? "1" : "0"}
                onSelectionChange={(selectedIsDisability: string) => {
                  setFieldValue("is_disability", selectedIsDisability === "1");
                }}
                name="is_disability"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div>
              <Field
                type="text"
                label="Skills"
                as={MultiSelectForm}
                items={skills}
                selectedKeys={
                  new Set(values.skills.map((skill) => skill.id.toString()))
                }
                onSelectionChange={(selectedKeys: string) => {
                  const selectedSkills = selectedKeys
                    .split(",")
                    .filter((key) => key !== "")
                    .map((key) => {
                      return { id: key };
                    });
                  setFieldValue("skills", selectedSkills);
                }}
                name="skills"
                selectionMode="multiple"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div>
              <Field
                type="text"
                label="Job Categories"
                as={MultiSelectForm}
                items={jobCategories}
                selectedKeys={
                  new Set(
                    values.job_categories.map((jobCategory) =>
                      jobCategory.id.toString()
                    )
                  )
                }
                onSelectionChange={(selectedKeys: string) => {
                  const selectedJobCategories = selectedKeys
                    .split(",")
                    .filter((key) => key !== "")
                    .map((key) => {
                      return { id: key };
                    });
                  setFieldValue("job_categories", selectedJobCategories);
                }}
                name="job_categories"
                selectionMode="multiple"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="text-center text-green-500">{editMessage}</div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    );
  };
  const CreateDataForm = ({
    onSubmit,
  }: CreateTableDataFormProps): JSX.Element => {
    const [createMessage, setCreateMessage] = useState("");
    const handleCreateSubmit = async (
      values: TableData,
      { setSubmitting, resetForm }: FormikHelpers<TableData>
    ) => {
      try {
        const formData = new FormData();
        formData.append("recruiter_id", values.recruiter_id.toString());
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("requirements", values.requirements);
        formData.append("employment_type", values.employment_type);
        formData.append("experience_level", values.experience_level);
        formData.append("work_type", values.work_type);
        formData.append("min_salary", values.min_salary.toString());
        formData.append("max_salary", values.max_salary.toString());
        formData.append("location", values.location);
        formData.append("is_disability", values.is_disability ? "1" : "0");
        formData.append("skills", JSON.stringify(values.skills));
        formData.append(
          "job_categories",
          JSON.stringify(values.job_categories)
        );
        const response = await axiosInstance.post(`/${url}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const responseData = response.data;
        if (responseData.status === "success") {
          Swal.fire("Success!", responseData.message, "success");
          onSubmit(responseData.data);
          resetForm();
        } else {
          setCreateMessage(responseData.message);
        }
      } catch (error) {
        setCreateMessage(`${singleTitle} creation failed! Please try again.`);
        console.log(error);
      }
      setSubmitting(false);
    };

    return (
      <Formik
        initialValues={{
          id: 0,
          recruiter_id: 0,
          title: "",
          description: "",
          requirements: "",
          employment_type: "",
          experience_level: "",
          work_type: "",
          min_salary: 0,
          max_salary: 0,
          location: "",
          is_disability: false,
          skills: [{ id: "", name: "" }],
          job_categories: [{ id: "", name: "" }],
        }}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4 bg-white text-gray-800">
            <div className="mb-4">
              <Field
                type="text"
                label="Recruiter"
                as={SelectForm}
                items={recruiters}
                selectedKey={values.recruiter_id}
                onSelectionChange={(selectedRecruiter: string) => {
                  setFieldValue("recruiter_id", selectedRecruiter);
                }}
                name="recruiter_id"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Title"
                as={InputForm}
                name="title"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Description"
                as={TextAreaForm}
                name="description"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Requirements"
                as={TextAreaForm}
                name="requirements"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Employment Type"
                as={SelectForm}
                items={employmentTypes}
                selectedKey={values.employment_type}
                onSelectionChange={(selectedEmploymentType: string) => {
                  setFieldValue("employment_type", selectedEmploymentType);
                }}
                name="employment_type"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Experience Level"
                as={SelectForm}
                items={experienceLevels}
                selectedKey={values.experience_level}
                onSelectionChange={(selectedExperienceLevel: string) => {
                  setFieldValue("experience_level", selectedExperienceLevel);
                }}
                name="experience_level"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Work Type"
                as={SelectForm}
                items={workTypes}
                selectedKey={values.work_type}
                onSelectionChange={(selectedWorkType: string) => {
                  setFieldValue("work_type", selectedWorkType);
                }}
                name="work_type"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="number"
                label="Minimum Salary"
                as={InputForm}
                name="min_salary"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="number"
                label="Maximum Salary"
                as={InputForm}
                name="max_salary"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                label="Location"
                as={InputForm}
                name="location"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="checkbox"
                label="Is Disability"
                as={SelectForm}
                items={isDisabilities}
                selectedKey={values.is_disability ? "1" : "0"}
                onSelectionChange={(selectedIsDisability: string) => {
                  setFieldValue("is_disability", selectedIsDisability === "1");
                }}
                name="is_disability"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div>
              <Field
                type="text"
                label="Skills"
                as={MultiSelectForm}
                items={skills}
                selectedKeys={
                  new Set(values.skills.map((skill) => skill.id.toString()))
                }
                onSelectionChange={(selectedKeys: string) => {
                  const selectedSkills = selectedKeys
                    .split(",")
                    .filter((key) => key !== "")
                    .map((key) => {
                      return { id: parseInt(key, 10) };
                    });
                  setFieldValue("skills", selectedSkills);
                }}
                name="skills"
                selectionMode="multiple"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div>
              <Field
                type="text"
                label="Job Categories"
                as={MultiSelectForm}
                items={jobCategories}
                selectionMode="multiple"
                selectedKeys={
                  new Set(
                    values.job_categories.map((jobCategory) =>
                      jobCategory.id.toString()
                    )
                  )
                }
                onSelectionChange={(selectedKeys: string) => {
                  const selectedJobCategories = selectedKeys
                    .split(",")
                    .filter((key) => key !== "")
                    .map((key) => {
                      return { id: parseInt(key, 10) };
                    });
                  setFieldValue("job_categories", selectedJobCategories);
                }}
                name="job_categories"
                className="mt-1 block w-full py-2 "
              />
            </div>
            {createMessage && (
              <div className="text-center text-red-500">{createMessage}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
              Create {singleTitle}
            </button>
          </Form>
        )}
      </Formik>
    );
  };
  useEffect(() => {
    fetchDatas();
    fetchRecruiters();
    fetchSkills();
    fetchJobCategories();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tableDatas.filter((data) =>
      data.title.toLowerCase().includes(term)
    );
    setFilteredTableData(filtered);
  };

  const handleDelete = async (dataId: number): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        confirmButton: "swal-custom-cursor",
        cancelButton: "swal-custom-cursor",
      },
    });

    if (result.isConfirmed) {
      const response = await axiosInstance.delete(`/${url}/${dataId}`);
      const responseData = response.data;
      setTableDatas(tableDatas.filter((data) => data.id !== dataId));
      setFilteredTableData(
        filteredTableData.filter((data) => data.id !== dataId)
      );
      if (responseData.status === "success") {
        Swal.fire("Deleted!", responseData.message, "success");
      } else {
        Swal.fire("Failed!", responseData.message, "error");
      }
    }
  };

  const handleUpdate = (data: TableData): void => {
    setSelectedTableData(data);
  };

  const handleSubmitUpdate = (updatedData: TableData): void => {
    setTableDatas(
      tableDatas.map((data) =>
        data.id === updatedData.id ? updatedData : data
      )
    );
    setFilteredTableData(
      filteredTableData.map((data) =>
        data.id === updatedData.id ? updatedData : data
      )
    );
    setSelectedTableData(null);
    toast.success(`${singleTitle} updated successfully`);
  };

  const indexOfLastTableData = (currentPage + 1) * tableDataPerPage;
  const indexOfFirstTableData = indexOfLastTableData - tableDataPerPage;
  const currentTableData = filteredTableData.slice(
    indexOfFirstTableData,
    indexOfLastTableData
  );

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {title}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleCreateOpen}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New {singleTitle}
        </Button>
      </Box>

      <Card>
        <div className="h-full">
          <motion.div
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${singleTitle}...`}
                  className="bg-gray-100 text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Employment Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Experience Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {currentTableData.length > 0 ? (
                    currentTableData.map((data) => (
                      <motion.tr
                        key={data.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                {data.title.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {data.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {data.employment_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {data.experience_level}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Rp {FormatCurrency(data.min_salary)} - Rp{" "}
                          {FormatCurrency(data.max_salary)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <button
                            onClick={() => handleUpdate(data)}
                            className="text-indigo-400 hover:text-indigo-600 mr-3"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(data.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <RemoveIcon />
                          </button>
                          {/* Add Skills */}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No {title} found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(
                  filteredTableData.length / tableDataPerPage
                )}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
              />
            </div>

            <Popup
              open={selectedTableData !== null}
              closeOnDocumentClick
              onClose={() => setSelectedTableData(null)}
            >
              <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg w-96 min-h-96 lg:h-[calc(100vh-200px)] overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4">
                  Edit {singleTitle}
                </h2>
                {selectedTableData && (
                  <EditDataForm
                    data={selectedTableData}
                    onSubmit={handleSubmitUpdate}
                  />
                )}
              </div>
            </Popup>
            <Popup
              open={isCreatePopupOpen}
              closeOnDocumentClick
              onClose={handleCreateClose}
              modal
            >
              <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg w-96 min-h-96 lg:h-[calc(100vh-200px)] overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4">
                  Create {singleTitle}
                </h2>
                <CreateDataForm
                  onSubmit={(newData) => {
                    setTableDatas([newData, ...tableDatas]);
                    setFilteredTableData([newData, ...filteredTableData]);
                    handleCreateClose();
                  }}
                />
              </div>
            </Popup>
          </motion.div>
        </div>
      </Card>
    </>
  );
};
function InputForm(props: { label: string; type: string }) {
  return <Input {...props} variant="bordered" />;
}
export default JobPostsTable;
