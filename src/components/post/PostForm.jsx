import React, { useState } from "react";
import "./PostForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const PostForm = ({ fetchPosts }) => {
  const [formData, setFormData] = useState({
    content: "",
    platforms: [],
    scheduledAt: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, platforms: [...formData.platforms, value] });
    } else {
      setFormData({
        ...formData,
        platforms: formData.platforms.filter((p) => p !== value),
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.content || !formData.scheduledAt) {
      toast.error("Content and Scheduled Time are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/posts", formData, {
        withCredentials: true,
      });
      toast.success("Post created successfully!");
      setFormData({ content: "", platforms: [], scheduledAt: "", imageUrl: "" });
      fetchPosts();
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <h3>Create New Post</h3>
      <textarea
        name="content"
        placeholder="Write your post content here..."
        value={formData.content}
        onChange={handleChange}
      />
      <div className="platforms">
        <label>
          <input
            type="checkbox"
            value="Instagram"
            checked={formData.platforms.includes("Instagram")}
            onChange={handleCheckbox}
          />
          Instagram
        </label>
        <label>
          <input
            type="checkbox"
            value="Facebook"
            checked={formData.platforms.includes("Facebook")}
            onChange={handleCheckbox}
          />
          Facebook
        </label>
        <label>
          <input
            type="checkbox"
            value="Twitter"
            checked={formData.platforms.includes("Twitter")}
            onChange={handleCheckbox}
          />
          Twitter
        </label>
      </div>

      <input
        type="datetime-local"
        name="scheduledAt"
        value={formData.scheduledAt}
        onChange={handleChange}
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </div>
  );
};

export default PostForm;
