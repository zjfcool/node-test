const express = require('express');
const router = express.Router();
const sqlUtil = require('../mysql');

router.get('/', function(req, res) {
  res.render('push_blog', { title: 'blog' ,username:req.session['admin']});
});
router.post('/',(req,res)=>{
  let obj={};
  obj.author=req.session.admin;
  obj.description=req.body.description;
  obj.title=req.body.title;
  obj.content=req.body.content;
  obj.pushtime=req.body.pushtime;
  obj.type=req.body.type;
  sqlUtil.insertBlog(obj, (odata)=>{
    res.send(odata);
  })
})
module.exports=router;
