import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";
import { Spin } from "antd";
import "./blogDetail.css";
import api from "../../config/axios";
import { toast } from "react-toastify";

function BlogDetail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const fetchBlogDetails = async () => {
    try {
      const response = await api.get(`newsBlog/${id}`);
      setBlogs(response.data);
    } catch (error) {
      toast.error("Error loading Blogs");
    }
  };
  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (!blogs) {
    return (
      <div className="loading ">
        <center>
          <Spin size="large" tip="Loading..." />
        </center>
      </div>
    );
  }
  return (
    <div>
      <LayoutTemplate>
        <div className="blog-detail-container">
          <img
            src={blogs.image}
            alt={blogs.title}
            className="blog-detail-image"
          />
          <div className="blog-detail-content">
            <h1 className="blog-detail-title">{blogs.title}</h1>
            <p className="blog-detail-date">
              Published on: {blogs.date_published}
            </p>
            <div className="blog-detail-body">{blogs.content}</div>
          </div>
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default BlogDetail;
