import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // get post id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    content: "",
    platforms: [],
    scheduledAt: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch post data for editing
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`, { withCredentials: true });
        setFormData({
          content: data.content,
          platforms: data.platforms,
          scheduledAt: data.scheduledAt.slice(0, 16), // convert to local datetime
          imageUrl: data.imageUrl
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle checkbox (multiple platforms)
  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      platforms: checked
        ? [...prev.platforms, value]
        : prev.platforms.filter((p) => p !== value)
    }));
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/posts/${id}`, formData, { withCredentials: true });
      alert("Post updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
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
          required
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
          required
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
