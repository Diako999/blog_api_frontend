import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/posts/", {
        title,
        content,
      });
      alert("Post created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert(`error creating the post: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-4"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
