const express = require('express');
const router = express.Router();
const { login} = require('../controller/user');

router.post('/login', (req, res, next) => {
  const { username,password } = req.body
  login(username,password).then((result) => {
    // console.log(result[0][0])
    if(result[0][0]){
      req.session.username = result[0][0].username
      res.json({
        error: '0000',
        data:'登录成功'
      })
    }else{
      res.json({
        error: '-1',
        data:'登录名或密码错误'
      })
    }
      
  })
});

module.exports = router;