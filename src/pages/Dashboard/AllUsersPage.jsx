import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEllipsisV } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';

const AllUsersPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit });
      if (statusFilter) params.append('status', statusFilter);
      const res = await axiosSecure.get(`/users?${params.toString()}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, updateData }) => axiosSecure.patch(`/users/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setDropdownOpenId(null);
    },
    onError: (error) => {
      alert('Action failed: ' + error.message);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading users.</div>;

  const { users, totalPages } = data;

  const handleBlockToggle = (user) => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    mutation.mutate({ id: user._id, updateData: { status: newStatus } });
  };

  const handleRoleChange = (user, newRole) => {
    mutation.mutate({ id: user._id, updateData: { role: newRole } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Status filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select
          className="select select-bordered w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.name || user.email}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.name || 'N/A'}</td>
                <td>
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold capitalize ${
                      user.role === 'admin'
                        ? 'bg-red-200 text-red-800'
                        : user.role === 'volunteer'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-blue-200 text-blue-800'
                    }`}
                  >
                    {user.role || 'donor'}
                  </span>
                </td>
                <td>
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold capitalize ${
                      user.status === 'blocked'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {user.status || 'active'}
                  </span>
                </td>
                <td className="flex items-center gap-2">
                  {/* Block / Unblock Button */}
                  <button
                    onClick={() => handleBlockToggle(user)}
                    className={`btn btn-xs ${
                      user.status === 'active' ? 'btn-error' : 'btn-success'
                    }`}
                  >
                    {user.status === 'active' ? 'Block' : 'Unblock'}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpenId(dropdownOpenId === user._id ? null : user._id)
                      }
                      className="btn btn-ghost btn-sm p-1"
                      aria-label="Actions menu"
                    >
                      <FaEllipsisV />
                    </button>

                    {dropdownOpenId === user._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-[9999]">
                        {user.role !== 'admin' && (
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleRoleChange(user, 'admin')}
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role !== 'volunteer' && (
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleRoleChange(user, 'volunteer')}
                          >
                            Make Volunteer
                          </button>
                        )}
                        {user.role !== 'donor' && (
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleRoleChange(user, 'donor')}
                          >
                            Make Donor
                          </button>
                        )}
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
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
