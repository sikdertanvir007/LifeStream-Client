import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { imageUpload } from '../../utils/imageUpload'
import JoditEditor from 'jodit-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [content, setContent] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  // Fetch existing blog data
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (blogData) {
      reset({ title: blogData.title });
      setContent(blogData.content);
      setCurrentImage(blogData.thumbnail);
    }
  }, [blogData, reset]);

  // Mutation for updating blog
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/blogs/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Blog updated successfully');
      queryClient.invalidateQueries(['blogs']);
      navigate('/dashboard/content-management');
    },
  });

  const onSubmit = async (data) => {
    let thumbnailUrl = currentImage;
    if (data.thumbnail && data.thumbnail[0]) {
      thumbnailUrl = await imageUpload(data.thumbnail[0]);
    }

    updateMutation.mutate({
      title: data.title,
      thumbnail: thumbnailUrl,
      content,
    });
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title')} className="input input-bordered w-full" required />
        
        <div>
          <p className="mb-1 font-medium">Current Thumbnail:</p>
          <img src={currentImage} alt="thumbnail" className="w-32 rounded mb-2" />
          <input type="file" {...register('thumbnail')} className="file-input file-input-bordered w-full" />
        </div>

        <JoditEditor value={content} onBlur={(newContent) => setContent(newContent)} />
        <button className="btn btn-primary">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlogPage;
