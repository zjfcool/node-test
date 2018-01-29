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
  },
  selectAllDetails:function(cb){
    db.query(`SELECT * FROM details`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb(data)
      }
    })
  },
  selectDetail:function(detailID,cb){
    db.query(`SELECT * FROM details WHERE ID='${detailID}'`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb(data)
      }
    })
  },
  delDetail:function(id,cb){
    db.query(`DELETE FROM details WHERE ID='${id}'`,(err,results,fields)=>{
      if(err){
        throw Error(err);
      }else{
        cb({code:1,msg:'del success'});
      }
    })
  },
  insertBlog:function(obj,cb){
    let {author,description,pushtime,content,title,type}=obj;
    db.query(`INSERT INTO details (author,description,pushtime,content,title,type) VALUES('${author}','${description}','${pushtime}','${content}','${title}','${type}')`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb({code:1,msg:'submit success'})
      }
    })
  },
  selectSomeDetails:function(typeid,cb){
    db.query(`SELECT * FROM details WHERE type='${typeid}'`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb(data);
      }
    })
  },
  selectUserBlogs:function(author,cb){
    db.query(`SELECT * FROM details WHERE author='${author}'`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb(data)
      }
    })
  },
  editDetail:function(obj,cb){
    db.query(`UPDATE details SET description='${obj.description}',title='${obj.title}',content='${obj.content}',type='${obj.type}' WHERE ID=${obj.id}`,(err,data)=>{
      if(err){
        throw Error(err);
      }else{
        cb({code:1,msg:'edit success'})
      }
    })
  }
}
module.exports=dbAction
