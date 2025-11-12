import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    content: "",
    platforms: [],
    scheduledAt: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(true);

  // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/api/posts/${id}`, { withCredentials: true });

                // ✅ Convert UTC from backend to local time
                const utcDate = new Date(data.scheduledAt);
                const tzOffset = utcDate.getTimezoneOffset() * 60000; // in ms
                const localISO = new Date(utcDate.getTime() - tzOffset).toISOString().slice(0, 16);

                setFormData({
                    content: data.content,
                    platforms: data.platforms,
                    scheduledAt: localISO,
                    imageUrl: data.imageUrl,
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

  // Simple state updater
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle platform checkboxes
  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      platforms: checked
        ? [...prev.platforms, value]
        : prev.platforms.filter((p) => p !== value)
    }));
  };

  // Submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = new Date(formData.scheduledAt);
    const now = new Date();

    // Validate scheduled date/time
    if (selected < now) {
      toast.error("❌ You cannot select a past date or time.");
      return;
    }

    // Validate content
    if (!formData.content) {
      toast.error("Content is required");
      return;
    }

    // Validate platforms
    if (formData.platforms.length === 0) {
      toast.error("Please select at least one platform (Instagram, Facebook, or Twitter).");
      return;
    }

    try {
      await axios.put(`/api/posts/${id}`, formData, { withCredentials: true });
      toast.success("Post updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  if (loading) return <p>Loading post data...</p>;

  return (
    <div className="edit-post-container">
      <h2>Edit Scheduled Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />

        <label>Platforms:</label>
        <div className="checkbox-group">
          {["Facebook", "Instagram", "Twitter"].map((platform) => (
            <label key={platform}>
              <input
                type="checkbox"
                value={platform}
                checked={formData.platforms.includes(platform)}
                onChange={handlePlatformChange}
              />
              {platform}
            </label>
          ))}
        </div>

        <label>Schedule Date & Time:</label>
        <input
          type="datetime-local"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 16)} // Prevent past date/time
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
