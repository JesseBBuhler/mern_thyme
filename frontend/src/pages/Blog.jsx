import React from "react";
import { useEffect } from "react";
import { useBlogsContext } from "../hooks/useBlogContext";

//components
import BlogCard from "../components/BlogCard";

function Blog() {
  const { blogs, dispatch } = useBlogsContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/public/blog");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_BLOGS", payload: json });
        } else {
          console.error("Request failed");
        }
      } catch (error) {
        console.error("Fetch error", error);
      }
    };
    fetchBlogs();
  }, [dispatch]);
  return (
    <section className="blog-results">
      <div className="blog-list">
        {blogs &&
          blogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog}></BlogCard>;
          })}
      </div>
    </section>
  );
}

export default Blog;
