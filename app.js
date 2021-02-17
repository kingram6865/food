require('dotenv').config()
const pug = require('pug')
const express = require('express')
// const mysql = require('mysql2')
const db = require('./model/dbcalls')
const utils = require('./utils')

const app = express()

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  let results = await db.getFoodData('44005')
  console.log(results)

  // res.render('index', {data: results})
  res.json(results)
})

app.get('/food', async (req, res) => {
  let results = await db.getFoodData('44005')
  res.json(results[0])
})

app.get('/food/group', async (req, res) => {
  let results = await db.listAllFoodGroups()
  // console.log(` /food/group endpoint:${results}`)
  res.json(results)
})

app.get('/food/:ndbno', async (req, res) => {
  let output
  let results = await db.getFoodData(req.params.ndbno)

  results.forEach((x, i) => {
    let nutrient_info = utils.isFat({
      [x.nutr_desc]: {
        tagname: x.tagname,
        value: x.nutr_val,
        units: x.units,
        fatty_acid_type: x.fatty_acid_type,
        systematic_name: x.systematic_name,
        isomer_name: x.isomer_name
      }
    })

    console.log(`Line 45: ${JSON.stringify(nutrient_info)}`)

    if (i === 0) {
      // console.log(i, x.long_desc)
      output = {
        objid: x.objid,
        ndb_no:x.ndb_no,
        fdgrp_cd:x.fdgrp_cd,
        long_desc:x.long_desc,
        short_desc:x.short_desc,
        common_name:x.common_name,
        mfg_name:x.mfg_name,
        survey:x.survey,
        ref_desc:x.ref_desc,
        refuse:x.refuse,
        sciName:x.sciName,
        n_factor:x.n_factor,
        pro_factor:x.pro_factor,
        fat_factor:x.fat_factor,
        cho_factor:x.cho_factor,
        nutritional_data: []
      }

      output.nutritional_data.push(nutrient_info)
      // output.nutritional_data.push({
      //   [x.nutr_desc]: {
      //     tagname: x.tagname,
      //     value: x.nutr_val,
      //     units: x.units,
      //     fatty_acid_type: x.fatty_acid_type,
      //     systematic_name: x.systematic_name,
      //     isomer_name: x.isomer_name
      //   }
      // })

    } else {
      output.nutritional_data.push(nutrient_info)
      // // console.log(i, x.nutr_desc)
      // output.nutritional_data.push({
      //   [x.nutr_desc]: {
      //     tagname: x.tagname,
      //     value: x.nutr_val,
      //     units: x.units,
      //     fatty_acid_type: x.fatty_acid_type,
      //     systematic_name: x.systematic_name,
      //     isomer_name: x.isomer_name
      //     }
      // })
    }
  })

  // res.send(`Getting data for food with NDB# ${req.params.ndbno}`)
  res.json(output)
})


app.get('/food/group/all/:groupid', async (req, res) => {
  let results = await db.listFoodsByGroup(req.params.groupid)

  res.json(results)
})

app.get('/food/group/:code', async(req, res) => {
  let results = await db.listFoodGroup(req.params.code)
  console.log(results)
  res.json(results[0])
})

app.listen(8005, '192.168.1.19')