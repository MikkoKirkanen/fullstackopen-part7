import express from 'express'
import middleware from '../utils/middleware.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body

  const user = await User.findById(req.user.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  })
  const savedBlog = await blog.save()
  savedBlog.populate('user')
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/', middleware.userExtractor, async (req, res) => {
  const blog = req.body
  await Blog.findByIdAndUpdate(blog.id, blog).populate('user')
  res.status(200).json(blog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const blog = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate('user')
  res.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  const userId = req.user?.id

  if (blog && blog?.user?.toString() === userId) {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { blogs: id } },
      { new: true }
    )
    await blog.deleteOne()
    return res.status(200).json({ title: 'Blog successfully deleted' })
  }
})

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (req, res) => {
    const id = req.params.id
    const comment = req.body.comment

    if (!comment) {
      return res.status(400).json({ title: 'Comment cannot be empty' })
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    )
    blog.populate('user')

    res.status(201).json(blog)
  }
)

export default blogsRouter
