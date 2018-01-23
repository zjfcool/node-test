const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  console.log(1)
  req.session=null;
  res.send({code:1});
  // res.render('index', { title: 'Home' ,username:req.session['admin']});
  // res.redirect(200,'/')
})

module.exports=router;
