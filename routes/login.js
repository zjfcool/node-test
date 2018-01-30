const express = require('express');
const router = express.Router();
const omd5 = require('../common/md5');
const usersUtil = require('../mysql');
router.get('/',(req,res,next)=>{
  return res.render('login',{});
  next();
});
router.post('/',async (req,res)=>{
  let username = req.body.username;
  let password = omd5.md5(req.body.password+omd5.EXTKEY);
  usersUtil.selectUser(username,password,obj=>{
    if(obj.code){
      req.session['admin_id']=obj.data[0].ID;
      req.session['admin']=obj.data[0].username;
      usersUtil.selectLogo(username,data1=>{
        // 如果没有用户名
        if(!!!data1[0]){
          usersUtil.insertLogo({username:username,imgurl:'logo.png'},data=>{
            usersUtil.selectLogo(username,data2=>{
              req.session['logo']=data2[0].imgurl;
              res.send({code:obj.code,msg:obj.msg}).end()
            })
          })
          // 如果存在用户名
        }else{
          req.session['logo']=data1[0].imgurl;
          res.send({code:obj.code,msg:obj.msg}).end()
        }
      })
      // res.redirect(200,'/');

    }else if(!obj.code){
      res.send({code:obj.code,msg:obj.msg}).end();
    }
  })
})



module.exports=router;
