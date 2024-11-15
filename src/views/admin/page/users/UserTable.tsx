import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Popup from "reactjs-popup";
import ReactPaginate from "react-paginate";

// Define interfaces
interface User {
  id: number;
  email: string;
  name: string;
  status: UserStatus;
  role: string;
}

// Using literal types for better type safety
type UserStatus = "Active" | "Inactive";

// Props for form components
interface EditUserFormProps {
  user: User;
  onSubmit: (updatedUser: User) => void;
}

// Sample data interface
interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
}

const EditUserForm = ({ user, onSubmit }: EditUserFormProps): JSX.Element => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedUser: User = {
      ...user,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      status: formData.get("status") as UserStatus,
    };

    onSubmit(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Role</label>
        <select
          name="role"
          defaultValue={user.role}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Status
        </label>
        <select
          name="status"
          defaultValue={user.status}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
      >
        Save Changes
      </button>
    </form>
  );
};

const UsersTable = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const usersPerPage = 5;

  const fetchUsers = async (): Promise<void> => {
    try {
      const sampleData: UserData[] = [
        {
          id: 1,
          email: "john.doe@example.com",
          name: "John Doe",
          role: "Student",
        },
        {
          id: 2,
          email: "jane.smith@example.com",
          name: "Jane Smith",
          role: "Teacher",
        },
        {
          id: 3,
          email: "michael.jones@example.com",
          name: "Michael Jones",
          role: "Admin",
        },
        {
          id: 4,
          email: "emily.davis@example.com",
          name: "Emily Davis",
          role: "Student",
        },
        {
          id: 5,
          email: "william.brown@example.com",
          name: "William Brown",
          role: "Teacher",
        },
        {
          id: 6,
          email: "olivia.wilson@example.com",
          name: "Olivia Wilson",
          role: "Student",
        },
        {
          id: 7,
          email: "james.moore@example.com",
          name: "James Moore",
          role: "Admin",
        },
        {
          id: 8,
          email: "isabella.taylor@example.com",
          name: "Isabella Taylor",
          role: "Teacher",
        },
        {
          id: 9,
          email: "ethan.anderson@example.com",
          name: "Ethan Anderson",
          role: "Student",
        },
        {
          id: 10,
          email: "mia.thomas@example.com",
          name: "Mia Thomas",
          role: "Admin",
        },
      ];

      const usersWithRoles: User[] = sampleData
        .filter((user) => user.email !== "superadmin@gmail.com")
        .map((user) => ({
          ...user,
          status: Math.random() > 0.5 ? "Active" : "Inactive",
        }));

      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
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
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
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

  const getStatusClassName = (status: UserStatus): string => {
    return status === "Active"
      ? "bg-green-800 text-green-100"
      : "bg-red-800 text-red-100";
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 text-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-100 text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                Status
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
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClassName(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="text-indigo-400 hover:text-indigo-600 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash size={18} />
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
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl text-white font-semibold mb-4">Edit User</h2>
          {selectedUser && (
            <EditUserForm user={selectedUser} onSubmit={handleSubmitUpdate} />
          )}
        </div>
      </Popup>
    </motion.div>
  );
};

export default UsersTable;
