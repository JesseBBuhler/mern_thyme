function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h4>{blog.title}</h4>
      <img
        className="blog-cover-img"
        src={`${process.env.PUBLIC_URL}/blogimg/${blog.coverImgURL}`}
        alt={blog.imgAlt}
      ></img>
      <div className="tags">
        <ul>
          {blog.tags.map((tag) => {
            return <li>{tag}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default BlogCard;
