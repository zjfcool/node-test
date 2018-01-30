const express = require('express');
const router = express.Router();
const sqlUtil = require('../mysql');

router.get('/',(req,res,next)=>{
  if(req.session['admin']){
    sqlUtil.selectUserBlogs(req.session['admin'],data=>{
      return res.render('blog_table',{username:req.session['admin'],title:'管理',details:data,logo:req.session['logo']});
    })
  }else{
    res.redirect('/login');
  }

});
router.post('/',(req,res,next)=>{
  if(req.body.operation==='del'){
    sqlUtil.delDetail(req.body.id,(data)=>{
      if(data.code){
        return res.send(data).end();
      }
    });
  }else{
    next();
  }
});
router.post('/',(req,res)=>{
  if(req.body.operation==='edit'){
    sqlUtil.editDetail(req.body,(data)=>{
      if(data.code){

        res.send(data);
      }
    })
  }
})



module.exports=router;
