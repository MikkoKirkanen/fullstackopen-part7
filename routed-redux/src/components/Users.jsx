import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Users = () => {
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()

  const onNavigate = (id) => {
    navigate(`/users/${id}`)
  }

  return (
    <div>
      <h1>Users</h1>
      <Table className='w-auto' hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id} className='user-row' onClick={() => onNavigate(u.id)}>
                <td>{u.name}</td>
                <td className='text-end'>{u.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
