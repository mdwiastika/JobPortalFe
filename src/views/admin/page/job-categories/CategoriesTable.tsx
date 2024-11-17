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

interface TableData {
  id: number;
  category_name: string;
  icon: string;
}

interface EditTableDataFormProps {
  data: TableData;
  onSubmit: (updatedData: TableData) => void;
}
interface CreateTableDataFormProps {
  onSubmit: (updatedData: TableData) => void;
}
interface CustomChangeEvent extends ChangeEvent<HTMLInputElement> {
  currentTarget: HTMLInputElement & {
    files: FileList;
  };
}
const CategoriesTable = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tableDatas, setTableDatas] = useState<TableData[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedTableData, setSelectedTableData] = useState<TableData | null>(
    null
  );
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const handleCreateOpen = () => setIsCreatePopupOpen(true);
  const handleCreateClose = () => setIsCreatePopupOpen(false);
  const title = "Job Categories";
  const url = "job-categories";
  const singleTitle = "Job Category";
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
    const [editMessage, setEditMessage] = useState("");
    const [logoPreview, setLogoPreview] = useState<File | null>(null);
    const handleEditSubmit = async (
      values: TableData,
      { setSubmitting, resetForm }: FormikHelpers<TableData>
    ) => {
      try {
        const formData = new FormData();
        if (logoPreview) {
          console.log("logoPreview", logoPreview);
          formData.append("icon", logoPreview);
        }
        formData.append("category_name", values.category_name);
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
          setEditMessage(responseData.message);
          resetForm();
          setSelectedTableData(null);
          setTableDatas(
            tableDatas.map((prevData) =>
              prevData.id === data.id
                ? {
                    ...prevData,
                    icon: responseData.data.icon,
                    category_name: responseData.data.category_name,
                  }
                : prevData
            )
          );
          setFilteredTableData(
            filteredTableData.map((prevData) =>
              prevData.id === data.id
                ? {
                    ...prevData,
                    icon: responseData.data.icon,
                    category_name: responseData.data.category_name,
                  }
                : prevData
            )
          );
          setLogoPreview(null);
        } else {
          setEditMessage(responseData.message);
        }
      } catch (error) {
        setEditMessage(`${singleTitle} update failed! Please try again.`);
        console.log(error);
      }
      setSubmitting(false);
    };
    const logoHandler = (e: CustomChangeEvent): void => {
      const file = e.currentTarget.files[0];
      if (!file) return;
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(file);
      document.getElementById("logo")!.setAttribute("src", previewUrl);
    };
    return (
      <Formik
        initialValues={{
          id: data.id,
          category_name: data.category_name,
          icon: "",
        }}
        onSubmit={handleEditSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 bg-white text-gray-800">
            <div className="mb-4">
              <Field
                type="text"
                label="Category Name"
                as={InputForm}
                name="category_name"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <div className="border-2 border-gray-300 rounded-xl py-2 px-2">
                <label htmlFor="logo" className="text-xs">
                  Icon
                </label>
                <Field
                  label="Icon"
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      logoHandler(e as CustomChangeEvent);
                    }
                  }}
                  name="icon"
                  className="mt-1 block w-full text-gray-700 text-sm
                 file:mr-4 file:py-0 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-gray-700
                 hover:file:bg-blue-100"
                />
              </div>
              <img
                src={
                  data.icon.includes("http")
                    ? data.icon
                    : `${import.meta.env.VITE_BE_URL}/storage/${data.icon}`
                }
                id="logo"
                className="w-12 h-full object-contain mx-2 mt-2"
                alt=""
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
    const [logoPreview, setLogoPreview] = useState<File | null>(null);
    const [createMessage, setCreateMessage] = useState("");
    const handleCreateSubmit = async (
      values: TableData,
      { setSubmitting, resetForm }: FormikHelpers<TableData>
    ) => {
      try {
        const formData = new FormData();
        if (logoPreview) {
          formData.append("icon", logoPreview);
        }
        formData.append("category_name", values.category_name);
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

    const logoHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
      if (!file) return;
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(file);
      document.getElementById("logo")!.setAttribute("src", previewUrl);
    };

    return (
      <Formik
        initialValues={{
          id: 0,
          category_name: "",
          icon: "",
        }}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 bg-white text-gray-800">
            <div className="mb-4">
              <Field
                type="text"
                label="Category Name"
                as={InputForm}
                name="category_name"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <div className="border-2 border-gray-300 rounded-xl py-2 px-2">
                <label htmlFor="icon" className="text-xs">
                  Icon
                </label>
                <Field
                  label="Icon"
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      logoHandler(e as CustomChangeEvent);
                    }
                  }}
                  name="icon"
                  className="mt-1 block w-full text-gray-700 text-sm
                 file:mr-4 file:py-0 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-gray-700
                 hover:file:bg-blue-100"
                />
              </div>
              <img
                id="logo"
                className="w-12 h-full object-contain mx-2 mt-2"
                alt=""
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
              Create Company
            </button>
          </Form>
        )}
      </Formik>
    );
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tableDatas.filter((data) =>
      data.category_name.toLowerCase().includes(term)
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Icon
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
                                {data.category_name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {data.category_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <img
                              src={
                                data.icon.includes("http")
                                  ? data.icon
                                  : `${import.meta.env.VITE_BE_URL}/storage/${
                                      data.icon
                                    }`
                              }
                              alt=""
                              className="w-16 h-auto object-contain"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
              <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg w-96">
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
              <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg w-96">
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

export default CategoriesTable;
