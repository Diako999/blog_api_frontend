import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../components/ToasContext';
function EditPost() {
  const toast = useToast()
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        toast('failed to fetch post', 'error');
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/posts/${id}/`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      toast('post updated');
      navigate(`/post/${id}`);
    } catch (err) {
      toast('update failed', 'error');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Create a New Post</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              className="w-full p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
