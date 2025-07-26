
import { useQuery } from '@tanstack/react-query';


import { useParams } from 'react-router';
import Loading from './Loading';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Navbar from './shared/Navbar/Navbar';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blogDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
        <div className='mb-30'><Navbar></Navbar></div>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></article>
    </div>
    </div>
  );
};

export default BlogDetailsPage;