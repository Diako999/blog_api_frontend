import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/api/posts/');


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(currentPageUrl);
        console.log('API response:', response.data); // Check what the structure is
    
        // Ensure we are accessing the posts correctly
        if (response.data && Array.isArray(response.data.results)) {
          setPosts(response.data.results); // Set the posts from the 'results' key
          setNextPage(response.data.next); // Handle next page URL
          setPrevPage(response.data.previous); // Handle previous page URL
          setLoading(false)
        } else {
          setPosts([]); // Set to an empty array if no posts are found
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false)
      }
    };
    
    fetchPosts();
  }, [currentPageUrl]);
  if (loading) {
    return <div><LoadingSpinner/></div>;  // Show loading message during fetch
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;  // Show error message if fetch fails
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-300">
    <div className="container mx-auto px-4 py-12 ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center" >Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                By {post.author} • {new Date(post.created_at).toLocaleDateString()}
              </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
            </p>
            <Link to={`/post/${post.id}`} className="inline-block text-blue-600 dark:text-blue-400 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => prevPage && setCurrentPageUrl(prevPage)}
          disabled={!prevPage}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage && setCurrentPageUrl(nextPage)}
          disabled={!nextPage}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default Home;
