require('dotenv').config
const fs = require('fs');
const fetch = require("node-fetch");
const json = require('big-json');

const readStream = fs.createReadStream('FilteredDataHuman.json');
const parseStream = json.createParseStream();
const HOST= process.env.TRANSFORM_HOST

const humans = [];
const instances = [];

parseStream.on('data', function (pojo) {
    // => receive reconstructed POJO
    pojo.forEach(element => {
        const id=element._id['$oid'];
        humans.push({
            date: element.timestamp['$date']['$numberLong'],
            id
        })
        instances.push(...Object.values(element.instances).map(x => ({ ...x, human_id: id })))
    });
    insertData()

});
readStream.pipe(parseStream);



async function createHumansTable() {
    try {
      const query = "CREATE TABLE IF NOT EXISTS humans (date TIMESTAMP, id STRING)"
  
      const response = await fetch(
        `${HOST}/exec?query=${encodeURIComponent(query)}`,
      )
      const json = await response.json()
  
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  async function createInstancesTable() {
    try {
      const query = "CREATE TABLE IF NOT EXISTS instances (pos_x FLOAT, pos_y FLOAT, human_id STRING)"
  
      const response = await fetch(
        `${HOST}/exec?query=${encodeURIComponent(query)}`,
      )
      const json = await response.json()
  
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  async function insertHuman(h) {
    try {
      const query = `INSERT INTO humans VALUES(${h.date}, '${h.id}')`
  
      const response = await fetch(
        `${HOST}/exec?query=${encodeURIComponent(query)}`,
      )
      const json = await response.json()
  
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  async function insertInstance(i) {
    try {
      const query = `INSERT INTO instances VALUES(${i.pos_x}, ${i.pos_y}, '${i.human_id}')`
  
      const response = await fetch(
        `${HOST}/exec?query=${encodeURIComponent(query)}`,
      )
      const json = await response.json()
  
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
const insertData = async() => {
    parseStream.destroy();
    await createHumansTable();
    await createInstancesTable();
    
  for (let index = 0; index < humans.length; index++) {
     await insertHuman( humans[index])
  }
  for (let index = 0; index < instances.length; index++) {
    await insertInstance(instances[index])
 }
    
}