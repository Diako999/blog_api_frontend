import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post Detail</h1>
      <p>Showing details for post ID: {id}</p>
    </div>
  );
};

export default PostDetail;
