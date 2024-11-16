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
import SelectForm from "src/components/SelectFormNext";
import FormatString from "src/components/FormatString";
import { Box, Button, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Card } from "@mui/material";

interface Role {
  name: string;
}
interface User {
  id: number;
  email: string;
  full_name: string;
  roles: Role[];
  password: string;
}

interface EditUserFormProps {
  user: User;
  onSubmit: (updatedUser: User) => void;
}
const roles = [
  { id: "admin", name: "Admin" },
  { id: "recruiter", name: "Recruiter" },
  { id: "job_seeker", name: "Job Seeker" },
];

const CompaniesTable = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const usersPerPage = 5;
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/users");
      const responseData = response.data;
      const sampleData: User[] = responseData.data;
      setUsers(sampleData);
      setFilteredUsers(sampleData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };
  const EditUserForm = ({ user }: EditUserFormProps): JSX.Element => {
    const [selectedKeyRole, setSelectedKeyRole] = useState(user.roles[0].name);
    const [editMessage, setEditMessage] = useState("");
    const handleEditSubmit = async (
      values: User,
      { setSubmitting, resetForm }: FormikHelpers<User>
    ) => {
      try {
        const response = await axiosInstance.put(`/users/${user.id}`, {
          full_name: values.full_name,
          email: values.email,
          roles: selectedKeyRole,
        });
        const responseData = response.data;
        if (responseData.status == "success") {
          setEditMessage(responseData.message);
          resetForm();
          setSelectedUser(null);
          setUsers(
            users.map((prevUser) =>
              prevUser.id === values.id
                ? {
                    ...prevUser,
                    full_name: values.full_name,
                    email: values.email,
                    roles: [{ name: selectedKeyRole }],
                  }
                : prevUser
            )
          );
          setFilteredUsers(
            filteredUsers.map((prevUser) =>
              prevUser.id === values.id
                ? {
                    ...user,
                    full_name: values.full_name,
                    email: values.email,
                    roles: [{ name: selectedKeyRole }],
                  }
                : prevUser
            )
          );
        } else {
          setEditMessage(responseData.message);
        }
      } catch (error) {
        setEditMessage("User update failed! Please try again.");
        console.log(error);
      }
      setSubmitting(false);
    };

    return (
      <Formik
        initialValues={{
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          roles: [{ name: user.roles[0].name }],
          password: "",
        }}
        onSubmit={handleEditSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 bg-white text-gray-800">
            {/* Name Field */}
            <div className="mb-4">
              <Field
                type="text"
                label="Name"
                as={InputForm}
                name="full_name"
                className="mt-1 block w-full py-2 "
              />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                label="Email"
                as={InputForm}
                name="email"
                className="mt-1 block w-full py-2 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                label="Isi password jika ingin mengganti"
                as={InputForm}
                name="password"
                className="mt-1 block w-full py-2 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <Field
                as={SelectForm}
                items={roles}
                selectedKey={selectedKeyRole}
                onSelectionChange={setSelectedKeyRole}
                label="Role"
                name="roles"
                className="mt-1 block w-full py-2 "
              ></Field>
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
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (userId: number): Promise<void> => {
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
      const response = await axiosInstance.delete(`/users/${userId}`);
      const responseData = response.data;
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      if (responseData.status === "success") {
        Swal.fire("Deleted!", responseData.message, "success");
      } else {
        Swal.fire("Failed!", responseData.message, "error");
      }
    }
  };

  const handleUpdate = (user: User): void => {
    setSelectedUser(user);
  };

  const handleSubmitUpdate = (updatedUser: User): void => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setSelectedUser(null);
    toast.success("User updated successfully");
  };

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Companies
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New company
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
              <h2 className="text-xl font-semibold text-slate-900">
                Companies
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
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
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.full_name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.full_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                            {FormatString(user.roles[0].name)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="text-indigo-400 hover:text-indigo-600 mr-3"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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
                        No users found.
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
                pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
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
              open={selectedUser !== null}
              closeOnDocumentClick
              onClose={() => setSelectedUser(null)}
            >
              <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                {selectedUser && (
                  <EditUserForm
                    user={selectedUser}
                    onSubmit={handleSubmitUpdate}
                  />
                )}
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

export default CompaniesTable;
