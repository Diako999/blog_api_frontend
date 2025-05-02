import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
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
        console.error('Failed to fetch post', err);
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
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
<div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your post here..."
      />
    </div>

    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md shadow"
    >
      Update Post
    </button>
  </form>
</div>

  );
}

export default EditPost;
