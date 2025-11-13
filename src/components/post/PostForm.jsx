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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content) {
      toast.error("Content is required");
      return;
    }

    if (formData.platforms.length === 0) {
      toast.error("Please select at least one platform (Instagram, Facebook, or Twitter).");
      return;
    }

    if (!formData.scheduledAt) {
      toast.error("Please select a date and time.");
      return;
    }

    const [datePart, timePart] = formData.scheduledAt.split("T"); // "2025-11-13T06:05"
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    // Construct a Date in local timezone
    const localDate = new Date(year, month - 1, day, hours, minutes, 0);

    const now = new Date();
    if (localDate < now) {
      toast.error("❌ You cannot select a past date or time.");
      return;
    }

    // Convert to UTC ISO string
    const scheduledAtUTC = localDate.toISOString();

    try {
      setLoading(true);
      await axios.post(
        "/api/posts",
        { ...formData, scheduledAt: scheduledAtUTC },
        { withCredentials: true }
      );

      toast.success("Post created successfully!");
      setFormData({ content: "", platforms: [], scheduledAt: "", imageUrl: "" });
      fetchPosts();
    } catch (err) {
      console.error(err);
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
        {["Instagram", "Facebook", "Twitter"].map((platform) => (
          <label key={platform}>
            <input
              type="checkbox"
              value={platform}
              checked={formData.platforms.includes(platform)}
              onChange={handleCheckbox}
            />
            {platform}
          </label>
        ))}
      </div>

      <input
        type="datetime-local"
        name="scheduledAt"
        value={formData.scheduledAt}
        onChange={handleChange}
        min={new Date().toISOString().slice(0, 16)} // prevent past dates
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
