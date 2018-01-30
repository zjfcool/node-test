# node-test
本人菜鸟一枚，自学了node一段时间用express，mysql做个小练习，有哪里不对或者值得优化的地方，求指正。
# 步骤
###### node 7+
###### 首先得安装了mysql数据库，mysql文件夹下有users.txt和details.txt数据表结构，导入到MySQL中
###### npm install
###### npm start
# 文件夹目录
## 1.mysql目录
   放操作数据库的方法的
## 2.routes目录
  ###### index.js 为路由入口文件，其余的为子路由，这么做是为了方便管理扩展。
# 整理一下思路
## 1.当用户打开主页时，如果用户未登录，重定向到登录页：
 ###### 如何判断用户是否登录？
 ###### 通过cookie-session这个中间件，判断req.session['seesion_id']是否存在。
 ###### 通过res.redirect('地址')，从定向到指定位置。
## 2.用户注册成功后，跳转到登录页。
![login](https://github.com/zjfcool/node-test/blob/master/public/images/login.png)
###### 注册时表单验证运用了Proxy,正好感受一下es6语法；
![reg](https://github.com/zjfcool/node-test/blob/master/public/images/reg.png)
###### 点击提交后，就开始数据库增删改查语句的运用，这部分数据库操作就放到了mysql中通过传递一个回调函数来执行接下来的操作；
###### 函数结构为function(username,password,callback){...}；
###### 不过这里给密码进行了MD5加密，运用了node的crypto模块，将这个公共方法封装了一下放到了common目录下；
## 3.用户登录成功后，跳转到主页。
###### 用户登录跟注册大同小异，跳转主页后有欢迎 *** 登录，这里的名字是通过数据库查询到的数据存储到session中，在将session数据传递到ejs模板中。
## 4.主页
###### 点击退出后，将清除session。
![logout](https://github.com/zjfcool/node-test/blob/master/public/images/logout.png)
## 5.增加
###### 主页增加了blog列表，并将其分类展示出来了，这里主要就是sql语句的使用，查询语句 select * from details
###### 写一个blog，这里主要是文本性质的表单，暂时没有写文件上传，图片上传的东东，数据库就用到了一条插入语句，insert into details (...)  values(...)
![blog](https://github.com/zjfcool/node-test/blob/master/public/images/blog.png)
## 6.用户管理blog列表
###### 将登陆用户写的博客表格形式展现出来，有删除和编辑功能
![blog](https://github.com/zjfcool/node-test/blob/master/public/images/guanli.png)
## 7.用户头像
###### 上传图片，更改用户头像。
![blog](https://github.com/zjfcool/node-test/blob/master/public/images/upload.png)
