import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("newsBlog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error loading Blogs");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Check out our News</h1>
      <div
        className="row justify-content-center"
        style={{ gap: "6%", "--bs-gutter-x": "0" }}
      >
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-3 mb-5 blogChild">
            <Link to={`/blogDetail/${blog.id}`}>
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderTopRightRadius: "15px",
                  borderTopLeftRadius: "15px",
                  objectFit: "cover",
                }}
              />
            </Link>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            {/* <h6>
              {blog.author} - {blog.date}
            </h6> */}
            <center>
              <Button>
                <Link to={`/blogDetail/${blog.id}`}>View More</Link>
              </Button>
            </center>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
