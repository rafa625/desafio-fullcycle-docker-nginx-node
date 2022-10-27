const express = require('express')
const { faker } = require('@faker-js/faker');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)


const createPeople = (nome) => new Promise((resolve, reject) => {
  const sql = `INSERT INTO people(name) values ('${nome}')`
  connection.query(sql, (error, results, fields) => {
    if (error) reject(error)
    resolve(results)
  })
})

const findPeoples = () => new Promise((resolve, reject) => {
  const select = `SELECT name FROM people`
  connection.query(select, (error, results, fields) => {
    if (error) reject(error)
    resolve(results)
  })
})

app.get('/', async (req, res) => {
  await createPeople(faker.name.firstName()).catch((error) => console.error(error))

  const peoples = await findPeoples()
    .then((data) => data)
    .catch((error) => console.error(error))
    
  res.json(peoples)
  
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})