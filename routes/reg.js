const express = require('express');
const router = express.Router();
const omd5 = require('../common/md5');
const sqlUtils = require('../mysql');
router.get('/',(req,res,next)=>{
  return res.render('reg',{});
  next()
});
router.post('/',(req,res)=>{
  let username = req.body.username;
  let password = omd5.md5(req.body.password+omd5.EXTKEY);
  sqlUtils.insertUser(username,password,(obj)=>{
    if(obj.code){
      res.send({code:1,msg:'注册成功'});
      // req.redirect('/login');
    }else{
      res.send({code:0,msg:obj.msg});
    }
  })
});



module.exports=router;
