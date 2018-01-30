var multer = require('multer');
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/upload')
  },
  filename:function(req,file,cb){
    cb(null,req.session['admin'])
  }
})
var upload = multer({storage});
module.exports=upload;
