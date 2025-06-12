import { useState, useEffect } from "react";
import { getPaginationTabels } from "../../services/paginationService";
import { getAllUsers } from "../../services/userService";
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon, MoreVerticalIcon, PlusIcon, SearchIcon } from "../../pages/Icons";

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "developer":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-red-100 text-gray-800 border-gray-200"
  }}
export default function ListOfUsers() {
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);                      
    const [searchQuery, setSearchQuery] = useState("")                           
    const [roleFilter, setRoleFilter] = useState("all")
    const [showDropdown, setShowDropdown] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await getAllUsers()
                setAllUsers(data.allUsers);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
     const filteredUsers = users.filter((user) => {
     const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const paginated = await getPaginationTabels(allUsers, page, limit);
                if (paginated && paginated.data && Array.isArray(paginated.data)) {
                    setUsers(paginated.data);
                    setTotalPages(paginated.totalPages);
                } else {
                    console.error("invalid datas paginated", paginated);
                }
            } catch (err) {
                console.error("pagination error:", err);
            }
        };

        fetchPage();
    }, [allUsers, page]);

    return (
    
 <div className="bg-gray-50 p-6 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-200">
      <div className="max-w-7xl ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">User Management</h1>
              <p className="text-gray-600 mt-2">Manage your team members and their permissions</p>
            </div>
         
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-200">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                  <option value="tester">Tester</option>
                </select>
                <button className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <FilterIcon />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:text-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">userName: {user.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phonenumber}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                  
                     <td className="py-4 px-6 text-center">
                      <div className="relative">
                        <button
                          onClick={() => setShowDropdown(showDropdown === user.id ? null : user.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVerticalIcon />
                        </button>
                        {showDropdown === user.id && (
                          <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              View Details
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center gap-2">
              <button
               disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon />
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {page} of {Math.max(1, totalPages)}
              </span>
              <button
               disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    );
}



