const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(allBlogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const authorizaiton = request.get("authorization");
  const token = authorizaiton.replace("Bearer ", "");
  if (!authorizaiton && !authorizaiton.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  let user = null;
  if (token) {
    user = await User.findById(decodedToken.id);
  } else {
    return response.status(401).json({ error: "Please Sign in" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token Invalid" });
  }
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user.id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  } else if (!body.comments) {
    body.comments = [];
  }
  if (blog.title && blog.url) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(400).send({ error: "Title or URL are missing. " });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const authorizaiton = request.get("authorization");
  const token = authorizaiton.replace("Bearer ", "");
  if (!authorizaiton && !authorizaiton.startsWith("Bearer ")) {
    return response
      .status(401)
      .json({ error: "Unauthorized or Try signing in again. " });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const blog = await Blog.findById(id);
  let user = null;
  if (token) {
    user = await User.findById(decodedToken.id);
  } else {
    return response.status(401).json({ error: "Please Sign in" });
  }
  if (
    !decodedToken.id ||
    !token ||
    decodedToken.id.toString() !== blog.user.toString()
  ) {
    return response.status(201).json({ error: "Token Invalid" });
  }

  await Blog.findByIdAndRemove({ _id: id });
  await user.blogs.filter((blog) => !(blog.id === id));
  await user.save();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: "ture",
  }).populate("user", { username: 1, name: 1 });
  response.status(201).json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const { comment } = request.body;
  const blog = await Blog.findById(id).populate("user", {
    username: 1,
    name: 1,
  });
  if (!blog.comments) {
    blog.comments = [];
  }
  blog.comments = blog.comments.concat(comment);
  const updatedBlog = await blog.save();
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(400).end();
});

module.exports = blogsRouter;
