const express = require("express");
const app = express();
const cors = require("cors")
const db = require("./db")
require("dotenv").config()

app.get('/createLogin',(req,res)=>{
    let sql = `
    CREATE TABLE Login(
        id int AUTO_INCREMENT,
        Username VARCHAR(255),
        salt VARCHAR(255),
        PasswordHash VARCHAR(255),
        Email VARCHAR(255),
        PRIMARY KEY(id)
    )
    `
    db.query(sql,(error,result)=>{
        if(error){
            throw error
        }
        res.send("created login table")
    })
})

const apis = require("./Router");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apis);




const PORT = process.env.PORT || 8080;
app.listen(PORT, `app started on ${PORT}`)