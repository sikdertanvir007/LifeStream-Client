
import { useQuery } from '@tanstack/react-query';

import Loading from './Loading';
import { Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Navbar from './shared/Navbar/Navbar';
import Footer from './shared/Footer/Footer';


const BlogPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['publishedBlogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs?status=published');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
        <div className='mb-30'><Navbar></Navbar></div>
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Our Blogs</h2>
      {blogs.length === 0 ? (
        <div className="bg-red-100 text-red-700 text-lg font-medium rounded p-6 shadow-md text-center">
          No blogs have been published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="card shadow-xl">
              <figure><img src={blog.thumbnail} alt={blog.title} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                <Link to={`/blogs/${blog._id}`} className="text-blue-600 mt-2 font-medium hover:underline">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className='mt-30'><Footer></Footer></div>
    </div>
  );
};

export default BlogPage;
