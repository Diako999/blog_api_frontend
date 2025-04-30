import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/');
        setPosts(response.data);
        setLoading(false);  // Stop loading after successful fetch
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch posts. Please try again.');
      }
    };
    
    fetchPosts();
  }, []);
  if (loading) {
    return <div><LoadingSpinner/></div>;  // Show loading message during fetch
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;  // Show error message if fetch fails
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">
              {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
            </p>
            <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
