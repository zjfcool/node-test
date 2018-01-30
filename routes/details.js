const express = require('express');
const router = express.Router();
const sqlUtil = require('../mysql');
const initDate = require('../common/initDate');
router.get('/', function(req, res) {
  sqlUtil.selectDetail( req.query.id,data =>{
    data[0]["pushtime"]=initDate.initDate(data[0].pushtime);
    res.render('details', { title: 'details' ,details:data[0],username:req.session['admin'],logo:req.session['logo']});
  })
});
module.exports=router;
