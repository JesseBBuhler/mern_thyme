function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <img
        className="blog-cover-img"
        src={`${process.env.PUBLIC_URL}/blogimg/${blog.coverImgURL}`}
        alt={blog.imgAlt}
      ></img>
      <div className="blog-summary">
        <h4>{blog.title}</h4>
        <div className="tags">
          <ul>
            {blog.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
