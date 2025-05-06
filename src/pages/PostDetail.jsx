import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {useToas, useToast} from '../components/ToasContext'
import ConfirmModal from '../components/ConfirmModal';
function PostDetail() {
  const toast = useToast()
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

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
      toast('post deleted');
      navigate('/');
    } catch (err) {
      toast('delete failed', 'error')
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-300">
    <div className="max-w-3xl mx-auto px-4 py-10 ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-left">{post.title}</h1>
      <p className="text-gray-400 text-lg leading-relaxed">{post.content}</p>
      {post.author === username && (
        <div className="flex gap-4 mt-4">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Edit
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Delete
              </button>
        </div>

      )}
          <ConfirmModal
      isOpen={showConfirm}
      onCancel={() => setShowConfirm(false)}
      onConfirm={() => {
        setShowConfirm(false);
        handleDelete();
      }}
      message="Are you sure you want to delete this post?"
    />
    </div>
    </div>
  );
}

export default PostDetail;
