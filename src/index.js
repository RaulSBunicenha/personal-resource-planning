const { createServer } = require('http')
const { Sequelize, DataTypes } = require('sequelize')
const port = process.env.PORT || 3000

function createDatabase () {
  const database = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    define: {
      underscored: true,
    }
  })

  return database
}

async function tryConnection (database) {
  await database.authenticate()
  return true
}

async function defineUserModel (database) {
  const User = database.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  })

  await User.sync({ force: true })

  return User
}

async function addUser (User, ...{ firstName, lastName }) {
  const user = User.build({ firstName, lastName })
  await user.save()
  return user
}

async function listUser (User) {
  return User.find()
}

createServer(async (req, res) => {
  try {
    const database = createDatabase()
    const User = await defineUserModel(database)
    await addUser(User, 'Raul', 'Bunicenha')
    await addUser(User, 'Renata', 'Longhi')

    const userList = await listUser(User)

    res.writeHead(200)
    res.end(JSON.stringify({
      status: true,
      data: userList
    }))
  } catch (err) {
    res.writeHead(500)
    res.end(JSON.stringify({
      status: false,
      error: {
        message: err.message
      }
    }))
  }
}).listen(port, () => console.log(`Server started on port ${port}`))
