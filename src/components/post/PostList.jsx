import React from "react";
import "./PostList.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, fetchPosts, loading }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, { withCredentials: true });
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (posts.length === 0) return <p>No posts created yet.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className={`post-item ${post.status}`}>
          <p><strong>Content:</strong> {post.content}</p>
          <p><strong>Platforms:</strong> {post.platforms.join(", ")}</p>
          <p><strong>Scheduled:</strong> {new Date(post.scheduledAt).toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span className={`status ${post.status}`}>
              {post.status === "scheduled" ? "⏳ Scheduled" : 
               post.status === "published" ? "✅ Published" : "❌ Failed"}
            </span>
          </p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}

          {/* ✅ SHOW BUTTONS ONLY FOR SCHEDULED POSTS */}
          {post.status === "scheduled" ? (
            <div className="post-actions">
              <button className="edit-btn" onClick={() => handleEdit(post._id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(post._id)}>
                Delete
              </button>
            </div>
          ) : (
            // ✅ SHOW MESSAGE FOR PUBLISHED/FAILED POSTS
            <div className="post-message">
              {post.status === "published" 
                ? "✅ This post has been published and cannot be edited or deleted" 
                : "❌ This post failed to publish"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;