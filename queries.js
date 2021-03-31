const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { owner, petNames } = request.body
  
    pool.query('INSERT INTO users (owner, petNames) VALUES ($1, $2) RETURNING id', [owner, petNames], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json(request.body)
      //response.status(201).send(`User added with owner name ${owner} and pet name(s) ${petNames.json} ID: ${results.rows[0].id}`)
    })
  }
  
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { owner, petNames } = request.body
  
    pool.query(
      'UPDATE users SET owner = $1, petNames = $2 WHERE id = $3',
      [owner, petNames,id],
      (error, results) => {
        if (error) {
          throw error
        }
        //response.status(200).send(`User modified with ID: ${id}`)
        response.send(request.body)
      }
    )
  }

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(request.body)
      //response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}