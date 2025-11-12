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
  const { name, value } = e.target;

  if (name === "scheduledAt") {
    const selected = new Date(value);
    const now = new Date();

    if (selected < now) {
      toast.error("❌ You cannot select a past date or time.");
      return; // stop the change
    } else {
      toast.success("✅ Scheduled time set successfully!");
    }
  }

  setFormData({ ...formData, [name]: value });
};



  setFormData({ ...formData, [name]: value });
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

    if (formData.platforms.length === 0) {
      toast.error("Please select at least one platform (Instagram, Facebook, or Twitter).");
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
        min={new Date().toISOString().slice(0, 16)} // ✅ prevents past date & time
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
