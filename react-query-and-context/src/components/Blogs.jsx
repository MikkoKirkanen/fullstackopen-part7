import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/blog'
import Blog from './Blog'

const Blogs = () => {
  const res = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1,
  })

  if (res.isLoading) {
    return <div>Loading data...</div>
  }

  if (res.isError) {
    return <div>Failed to retrieve data from the server.</div>
  }

  const blogs = res.data?.sort((a, b) => b.likes - a.likes)

  return (
    <div id='blogs' className='accordion'>
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
