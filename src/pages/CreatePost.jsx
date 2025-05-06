import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToasContext';
function CreatePost() {
  const toast = useToast()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/api/posts/',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast('post created successfully')
      navigate(`/post/${response.data.id}`);
    } catch (error) {
      toast('post creation failed, plese try again', 'error')
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Create a New Post</h1>
        <form onSubmit={handleSubmit}>
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

export default CreatePost;
