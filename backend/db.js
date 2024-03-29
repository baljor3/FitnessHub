const psql = require('psql')
require("dotenv").config()

const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: process.env.PORT,
})


db.connect((err)=>{
    if(err){
      console.log(err)
      throw err;
    }
    console.log("Connected to postgres");
  });

  process.on('exit', () => {
    db.end();
  });
module.exports = db;