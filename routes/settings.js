var express = require('express');
var router = express.Router();
var fs = require('fs');
var pathLib = require('path');
var multer = require('../common/multerUtil.js');
var sqlUtils = require('../mysql');
router.get('/',(req,res)=>{
  if(req.session['admin']){
    res.render('settings',{username:req.session['admin'],logo:req.session['logo']})
  }else{
    res.redirect('/')
  }

});
router.post('/',multer.any(),(req,res)=>{
  console.log(req.files)
  if(!!!req.files[0]){
    res.send({code:0,msg:'请选择图片'}).end();
  }
  // 如果为图片
  else  if(req.files[0].mimetype.split('/')[0]==='image'){
    var logo=req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;
    req.session['logo']=logo;
    var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newName,(err)=>{
      if(err){
        res.send('fail').end()
      }else{
        sqlUtils.updateLogo({username:req.session['admin'],imgurl:logo }, obj=>{
          if(obj.code){
            res.redirect('/settings');
          }
        })
      }
    })
  }
  // 如果不为图片
  else{
    res.send({code:0,msg:'上传文件格式为图片'}).end()
  }

});

module.exports=router;
