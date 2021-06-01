import bcrypt from 'bcryptjs'
const users = [
  {

    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {

    name: 'jane User',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {

    name: 'john User',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),

  },
]

export default users
