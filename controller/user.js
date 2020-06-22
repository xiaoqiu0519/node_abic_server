const { exec } = require('../db/mysql');
const escape = require('mysql').escape
const login = (username,password)=>{
  username = escape(username)
  password = escape(password)
  let sqlc = `select * from user where username=${username} and password=${password}`
  let sqle = `select * from user where username=${username} and password=${password}`
  return exec(sqlc,sqle)
}

module.exports = {
  login,
}