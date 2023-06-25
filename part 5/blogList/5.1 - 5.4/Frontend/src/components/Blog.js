const Blog = ({blogs}) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog => <p key={blog.id}>{blog.title} {blog.author}</p>)}
  </div>  
)

export default Blog