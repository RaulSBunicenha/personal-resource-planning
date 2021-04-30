const { createServer } = require('http')
const { Sequelize, DataTypes } = require('sequelize')
const port = process.env.PORT || 3000

function createDatabase () {
  const dbConfig = {
    dialect: 'postgres',
    host: process.env.DB_HOST.toString(),
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME.toString(),
    username: process.env.DB_USERNAME.toString(),
    password: process.env.DB_PASSWORD.toString(),
    logging: false,
    define: {
      underscored: true
    }
  }

  const database = new Sequelize(dbConfig)

  return database
}

async function tryConnection (database) {
  return database.authenticate()
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

  // await User.sync({ force: true })

  return User
}

async function addUser (User, firstName, lastName) {
  const user = User.build({ firstName, lastName })
  await user.save()
  return user
}

async function listUser (User) {
  return User.findAll()
}

createServer(async (req, res) => {
  try {
    const database = createDatabase()
    await tryConnection(database)
    const User = await defineUserModel(database)
    // await addUser(User, 'Raul', 'Bunicenha')
    // await addUser(User, 'Renata', 'Longhi')
    await addUser(User, 'João', 'Bragiola')

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
