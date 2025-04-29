import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);
        setPost(response.data);
      } catch (err) {
        console.error('Failed to fetch post details', err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Created on:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetail;
