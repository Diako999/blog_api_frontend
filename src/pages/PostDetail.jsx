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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/comments/?post=${id}`);
      console.log('Comments response:', res.data);
      setComments(Array.isArray(res.data.results) ? res.data.results : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchComments();
}, [id]);


  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return alert("Login required");
    if (!post) return;
  
    try {
      await axios.post(
        'http://localhost:8000/api/comments/',
        { post: post.id, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Re-fetch the full comment list
      const res = await axios.get(`http://localhost:8000/api/comments/?post=${post.id}`);
      setComments(res.data.results);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error.response?.data || error.message);
    }
  };
  
  
  
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async () => {

    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}/`, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
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
      <div className="mt-4">
  <h3 className="font-semibold dark:text-white mb-6 text-left">Tags:</h3>
  <div className="flex flex-wrap gap-2 mt-1">
    {post.tag_list.map((tag, index) => (
      <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
        #{tag}
      </span>
    ))}
  </div>
</div>
<div className="mt-6">
  <h3 className="text-lg font-semibold mb-2 dark:text-white mb-6 text-left">Comments</h3>
  {Array.isArray(comments) && comments.map(comment  => (
    <div key={comment.id} className="border p-3 mb-2 rounded bg-gray-100">
      <p className="text-sm text-gray-700">{comment.author_username} said:</p>
      <p>{comment.content}</p>
      <p className="text-xs text-gray-500">{new Date(comment.created).toLocaleString()}</p>
    </div>
  ))}

  <textarea
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="w-full mt-2 border rounded p-2"
    rows="3"
    placeholder="Write a comment..."
  />
  <button onClick={handleCommentSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
    Submit
  </button>
</div>

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