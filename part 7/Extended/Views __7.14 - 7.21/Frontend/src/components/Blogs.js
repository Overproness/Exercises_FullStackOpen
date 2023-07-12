import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <p key={blog.id} className="blog my-5">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
    </div>
  )
}

export default Blogs
