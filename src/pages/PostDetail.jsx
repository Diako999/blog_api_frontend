import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${post.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      navigate('/');
    } catch (err) {
      console.error('Delete failed', err);
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 ">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
      {post.author === username && (
        <div className="flex gap-4 mt-4">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Delete
              </button>
        </div>

      )}
    </div>
  );
}

export default PostDetail;
