require('dotenv').config()
const mysql = require('mysql2')
const DATABASE = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB
}

async function listFoodGroup(code) {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = `select * from fd_group where fdgrp_cd =${code}`

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

async function getAllFoodData() {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = "select c.*, a.tagname, b.nutr_val, a.units, a.nutr_desc, a.systematic_name, a.isomer_name, a.fatty_acid_type FROM nutrient_definition a, nutrient_data b, foods c where c.ndb_no = b.ndb_no and a.nutr_no = b.nutr_no group by c.long_desc"
  SQL = mysql.format(SQL)

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

async function listAllFoodGroups() {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = "SELECT * FROM fd_group"

  try {
    dbData = await conn.promise().query(SQL)
    console.log(dbData[0])
  } catch (e) {
    console.log(e)
  } finally {
    conn.end()
  }

  return dbData[0]
}

async function listFoodsByGroup(group) {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = `SELECT * FROM foods where fdgrp_cd = '${group}'`

  try {
    dbData = await conn.promise().query(SQL)
  } catch (e) {
    console.log(e)
  } finally {
    conn.end()
  }

  return dbData[0]
}

async function listFoodsByGroupId(group) {
  const conn = mysql.createConnection(DATABASE)
  let dbData
  let SQL = `SELECT * FROM food where fdgrp_cd = ${group}`

  try {
    dbData = await conn.promise().query(SQL)
  } catch (e) {
    console.log(e)
  } finally {
    conn.end()
  }

}

module.exports = {
  listFoodGroup,
  getFoodData,
  listFoodsByGroup,
  listAllFoodGroups
}