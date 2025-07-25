import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import JoditEditor from 'jodit-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../utils/imageUpload';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddBlogPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState('');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // <-- add this

  const mutation = useMutation({
    mutationFn: async (blogData) => {
      const res = await axiosSecure.post('/blogs', blogData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      reset();
      setContent('');

      // Show SweetAlert and navigate
      Swal.fire({
        icon: 'success',
        title: 'Blog Created!',
        text: 'Your blog has been saved as draft.',
        confirmButtonText: 'Go to Content Management'
      }).then(() => {
        navigate('/dashboard/content-management');
      });
    },
    onError: () => {
      toast.error('Failed to add blog');
    }
  });

  const onSubmit = async (data) => {
    const imageUrl = await imageUpload(data.thumbnail[0]);
    mutation.mutate({
      title: data.title,
      thumbnail: imageUrl,
      content,
      status: 'draft',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title')} placeholder="Blog Title" className="input input-bordered w-full" required />
        <input type="file" {...register('thumbnail')} className="file-input file-input-bordered w-full" required />
        <JoditEditor value={content} onBlur={(newContent) => setContent(newContent)} />
        <button className="btn btn-primary">Create Blog</button>
      </form>
    </div>
  );
};


export default AddBlogPage;