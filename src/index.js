const { createServer } = require('http')
const Sequelize = require('sequelize')
const port = process.env.PORT || 3000

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

createServer(async (req, res) => {
    res.writeHeader('200')
    res.end('Hello World')
}).listen(port, () => console.log(`Server started on port ${port}`))