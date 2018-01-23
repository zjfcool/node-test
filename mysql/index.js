const mysql = require('mysql');

let db = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'nodeTest'
});
var dbAction = {
  insertUser:function (username,password,cb){
    db.query(`SELECT * FROM users WHERE username='${username}'`,(err,data)=>{
      if(err){
        throw Error(err)
        console.log(`select insert error :${err}`);
        cb({code:0,msg:'数据库错误'})
      }else{
        console.log(data)
        if(data[0]){
          cb({code:0,msg:'用户名已存在'});
        }else{
          db.query(`INSERT INTO users (username,password) VALUES('${username}','${password}')`,(err,data)=>{
            if(err){
              throw Error(err)
              console.log(`insert error ${err}`);
              cb({code:0,msg:'数据库错误'})
            }
            else{
              cb({code:1,msg:'注册成功'});
            }
          })
        }
      }
    })
  },
  selectUser:function(username,password,cb){
    db.query(`SELECT * FROM users WHERE username='${username}'`,(err,data)=>{
      if(err){
        throw Error(err);
      }else if(!data[0]){
        cb({code:0,msg:'用户名不存在'})
      }else if(data[0].password!==password){
        cb({code:0,msg:'密码不正确'})
      }else{
        cb({code:1,msg:'登陆成功',data})
      }
    })
  }
}
module.exports=dbAction
