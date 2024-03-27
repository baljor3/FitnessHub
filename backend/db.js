psql = require('psql')


const db = new Client({
    user: 'root',
    host: 'localhost',
    database: 'fitnesshub',
    password: 'Ch159159',
    port: '5050',
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