require('dotenv').config()
const mysql = require('mysql2')
const pug = require('pug')
const express = require('express')

const app = express()
const DATABASE = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB
}

app.set('view engine', 'pug')

async function getFoodData(ndb_no) {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = "select c.*, a.tagname, b.nutr_val, a.units, a.nutr_desc, a.systematic_name, a.isomer_name, a.fatty_acid_type FROM nutrient_definition a, nutrient_data b, foods c where c.ndb_no = b.ndb_no and a.nutr_no = b.nutr_no and c.ndb_no=?"
  const params = [ndb_no]
  SQL = mysql.format(SQL, params)
  // console.log(SQL)

  try {
    dbData = await conn.promise().query(SQL)
    // console.log(`(Line 27):Data Array Length: ${dbData[0].length}`)
  } catch (e) {
    console.log(e)
  } finally {
    conn.end()
  }
  return dbData[0]
}

app.get('/', async (req, res) => {
  let results = await getFoodData('44005')
  console.log(results)

  res.render('index', {data: results})
})

app.get('/foods', (req, res) => {

})


app.listen(8005, '192.168.1.19')

// async function test() {
//   let testdata = await getFoodData('44005')
//   console.log(testdata[0])
// }

// test()