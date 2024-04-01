const express = require('express')
const router = express.Router()
const db = require('./db');
const bcrypt = require('bcrypt');
require('dotenv').config();


async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return {hashedPassword,salt};
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

router.post('/postLogin',(req,res) =>{
   try{
    const {username, password, email} = req.body

     // Number of salt rounds for bcrypt
    const {newPass,salt } = hashPassword(password)

    const values = [username,newPass,salt,email]
    let sql = `
    insert into login (username,salt,PasswordHash,Email)
    vales( $1,$2,$3,$4)
    `
    db.query(sql,values, (err,result)=>{
        if(err){
            console.log("error during inserting usersname and password",err)
            res.status(500).send('error during inserting usersname and password')
        }
        res.status(200).send("")
    })

   }catch{
    console.error('Error creating user:', error);
    res.status(500).send('error has occurred ')
   } 
})

module.exports = router;