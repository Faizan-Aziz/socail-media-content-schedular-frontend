import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostForm from "../post/PostForm"
import PostList from "../post/PostList";
import { toast } from "react-toastify";

const Dashboard = ({ setLoginFunc }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all"); // ✅ ADD FILTER STATE

  const fetchPosts = async (page = 1, status = statusFilter) => {
    try {
      setLoading(true);
      
      // ✅ BUILD URL WITH FILTER
      let url = `/api/posts?page=${page}&limit=10`;
      if (status !== "all") {
        url += `&status=${status}`;
      }
      
      const res = await axios.get(url, { 
        withCredentials: true 
      });
      
      setPosts(res.data.posts || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.page || 1);
      setTotalPosts(res.data.total || 0);
      
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE FILTER CHANGE
  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    fetchPosts(1, newStatus); // Reset to page 1 when filter changes
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("islogin");
      localStorage.removeItem("userInfo");
      setLoginFunc(false);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Dashboard</h2>
        <div className="header-actions">
          <button onClick={() => fetchPosts(currentPage, statusFilter)} className="refresh-btn">
            🔄 Refresh
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* ✅ FILTER CONTROLS */}
      <div className="filter-controls">
        <h3>Filter Posts:</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            📋 All Posts
          </button>
          <button 
            className={`filter-btn ${statusFilter === "scheduled" ? "active" : ""}`}
            onClick={() => handleFilterChange("scheduled")}
          >
            ⏳ Scheduled
          </button>
          <button 
            className={`filter-btn ${statusFilter === "published" ? "active" : ""}`}
            onClick={() => handleFilterChange("published")}
          >
            ✅ Published
          </button>
          <button 
            className={`filter-btn ${statusFilter === "failed" ? "active" : ""}`}
            onClick={() => handleFilterChange("failed")}
          >
            ❌ Failed
          </button>
        </div>
      </div>

      {/* ✅ Pagination Info */}
      <div className="pagination-info">
        <p>
          Showing {posts.length} of {totalPosts} {statusFilter !== "all" ? statusFilter : ""} posts 
          (Page {currentPage} of {totalPages})
        </p>
      </div>

      <PostForm fetchPosts={() => fetchPosts(1, statusFilter)} />
      <PostList posts={posts} fetchPosts={() => fetchPosts(currentPage, statusFilter)} loading={loading} />

      {/* ✅ Pagination Navigation */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            disabled={currentPage === 1} 
            onClick={() => fetchPosts(currentPage - 1, statusFilter)}
            className="pagination-btn"
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => fetchPosts(currentPage + 1, statusFilter)}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;