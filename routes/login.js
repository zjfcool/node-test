const express = require('express');
const router = express.Router();
const omd5 = require('../common/md5');
const usersUtil = require('../mysql');
router.get('/',(req,res,next)=>{
  res.render('login',{});
  next();
});
router.post('/',async (req,res)=>{
  let username = req.body.username;
  let password = omd5.md5(req.body.password+omd5.EXTKEY);
  usersUtil.selectUser(username,password,obj=>{
    if(obj.code){
      req.session['admin_id']=obj.data[0].ID;
      req.session['admin']=obj.data[0].username;
      // res.redirect(200,'/');
      res.send({code:obj.code,msg:obj.msg}).end();
    }else if(!obj.code){
      res.send({code:obj.code,msg:obj.msg}).end();
    }
  })
})



module.exports=router;
