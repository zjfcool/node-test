const express = require('express');
const router = express.Router();
const sqlUtil = require('../mysql');
const initDate = require('../common/initDate');

/* GET home page. */
function pushTime(data){
  for(let i=0;i<data.length;i++){
    data[i]["pushtime"]=initDate.initDate(data[i].pushtime);
  }
}
router.get('/', function(req, res,next) {
  sqlUtil.selectAllDetails( data =>{
    pushTime(data)
    let initdata={};
    initdata.all=data;
    initdata.anything=[];
    initdata.it=[];
    initdata.xs=[];
    initdata.zl=[];
    for(let i=0;i<data.length;i++){
      switch(data[i].type){
        case('anything'):
          initdata.anything.push(data[i]);
          break;
        case('it'):
          initdata.it.push(data[i]);
          break;
        case('xs'):
          initdata.xs.push(data[i]);
          break;
        case('zl'):
          initdata.zl.push(data[i]);
          break;
        default:
          break;
      }
    }
    res.render('index', { title: 'Home' ,details:initdata,username:req.session['admin']});
    next()
  })
  // if(req.session['admin_id']){
  //   res.render('index', { title: 'Home' ,username:req.session['admin']});
  // }else{
  //   res.redirect('/login');
  // }
});

module.exports=router;
