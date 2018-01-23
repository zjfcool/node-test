const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' ,username:req.session['admin']});
  // if(req.session['admin_id']){
  //   res.render('index', { title: 'Home' ,username:req.session['admin']});
  // }else{
  //   res.redirect('/login');
  // }

});
module.exports=router;
