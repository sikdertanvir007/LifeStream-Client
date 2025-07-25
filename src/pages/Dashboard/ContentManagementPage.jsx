import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import toast from 'react-hot-toast';
import { Link } from 'react-router';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ContentManagementPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useRole();
  const [filter, setFilter] = useState('all');

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  const publishMutation = useMutation({
  mutationFn: async (id) => axiosSecure.patch(`/blogs/${id}/status`, { status: 'published' }),
  onSuccess: () => {
    toast.success('Blog published');
    queryClient.invalidateQueries(['blogs']);
  },
});

const unpublishMutation = useMutation({
  mutationFn: async (id) => axiosSecure.patch(`/blogs/${id}/status`, { status: 'draft' }),
  onSuccess: () => {
    toast.success('Blog set to draft');
    queryClient.invalidateQueries(['blogs']);
  },
});


  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      toast.success('Blog deleted');
      queryClient.invalidateQueries(['blogs']);
    },
  });

  const filteredBlogs = filter === 'all' ? blogs : blogs.filter(b => b.status === filter);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog" className="btn btn-primary">Add Blog</Link>
      </div>
      <select className="select select-bordered mb-4" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <div className="grid gap-4">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="card bg-base-100 shadow p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p>Status: {blog.status}</p>
              </div>
              <div className="flex gap-2">
                {role === 'admin' && blog.status === 'draft' && (
                  <button className="btn btn-sm btn-success" onClick={() => publishMutation.mutate(blog._id)}>Publish</button>
                )}
                {role === 'admin' && blog.status === 'published' && (
                  <button className="btn btn-sm btn-warning" onClick={() => unpublishMutation.mutate(blog._id)}>Unpublish</button>
                )}
                {role === 'admin' && (
                  <button className="btn btn-sm btn-error" onClick={() => deleteMutation.mutate(blog._id)}>Delete</button>
                )}
                {(role === 'admin' || role === 'volunteer') && (
  <Link to={`/dashboard/content-management/edit/${blog._id}`} className="btn btn-sm btn-info">
    Edit
  </Link>
)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagementPage;