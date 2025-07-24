import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-donation-requests", user.email, statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("email", user.email);
      if (statusFilter) params.append("status", statusFilter);
      params.append("page", page);
      params.append("limit", limit);

      const res = await axiosSecure.get(`/my-donation-requests?${params.toString()}`);
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/donation-requests/${id}`, { status });
    },
    onSuccess: () => queryClient.invalidateQueries(["my-donation-requests", user.email]),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["my-donation-requests", user.email]),
  });

 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this donation request!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        Swal.fire("Deleted!", "The donation request has been deleted.", "success");
      },
      onError: () => {
        Swal.fire("Failed!", "Failed to delete the request.", "error");
      },
    });
  }
};


  if (isLoading) return <Loading></Loading>;
  if (error) return <div>Error loading requests</div>;

  const requests = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-red-500 font-bold mb-4">My Donation Requests</h2>

      {/* Status filter */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-semibold">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="select select-bordered max-w-xs"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            )}
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>
                <td>
                  {req.status}
                  {req.status === "inprogress" && (
                    <div className="mt-1 space-x-1">
                      <button
                        disabled={updateStatusMutation.isLoading}
                        onClick={() =>
                          updateStatusMutation.mutate({ id: req._id, status: "done" })
                        }
                        className="btn btn-success btn-sm"
                      >
                        Done
                      </button>
                      <button
                        disabled={updateStatusMutation.isLoading}
                        onClick={() =>
                          updateStatusMutation.mutate({ id: req._id, status: "canceled" })
                        }
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {req.status === "inprogress" && req.donor ? (
                    <>
                      <div>{req.donor.name}</div>
                      <div className="text-xs text-gray-600">{req.donor.email}</div>
                    </>
                  ) : (
                    <span className="italic text-gray-500">N/A</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-error btn-sm"
                      disabled={deleteMutation.isLoading}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                      className="btn btn-info btn-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="btn btn-outline"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => {
          const pageNum = n + 1;
          return (
            <button
              key={pageNum}
              className={`btn btn-outline btn-sm ${
                pageNum === page ? "btn-active" : ""
              }`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="btn btn-outline"
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
