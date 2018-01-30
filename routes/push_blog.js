const express = require('express');
const router = express.Router();
const sqlUtil = require('../mysql');

router.get('/', function(req, res) {
  res.render('push_blog', { title: 'blog' ,username:req.session['admin'],logo:req.session['logo']});
});
router.post('/',(req,res)=>{
  let obj={};
  obj.author=req.session.admin;
  obj.description=req.body.description;
  obj.title=req.body.title;
  obj.content=req.body.content;
  obj.pushtime=req.body.pushtime;
  obj.type=req.body.type;
  if(obj.title.length>16){
    res.send({code:0,msg:'title 字数应少于16个'}).end();
  }else{
    sqlUtil.insertBlog(obj, (odata)=>{
      res.send(odata).end();
    })
  }

})
module.exports=router;
