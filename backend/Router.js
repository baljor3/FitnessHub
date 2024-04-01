const express = require('express')
const router = express.Router()
const db = require('./db');
const bcrypt = require('bcrypt');
require('dotenv').config();


async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)
    return {hashedPassword,salt};
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

router.post('/postLogin',async (req,res) =>{
   try{
    const {username, password, email} = req.body

     // Number of salt rounds for bcrypt
    const { hashedPassword , salt } = await hashPassword(password)

    const values = [username,salt,hashedPassword,email]
    let sql = `
    insert into login (username,salt,PasswordHash,Email)
    values( $1,$2,$3,$4)
    `
    console.log(values)
    db.query(sql,values, (err,result)=>{
        if(err){
            console.log("error during inserting usersname and password",err)
            res.status(500).send('error during inserting usersname and password')
        }else{
        res.status(200).send("inserted values")
        }
    })

   }catch(error){
    console.error('Error creating user:', error);
    res.status(500).send('error has occurred ')
   } 
})

module.exports = router;