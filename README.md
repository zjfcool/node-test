# node-test
自学了node一段时间用express，mysql做个小练习
# 步骤
###### 首先得安装了mysql数据库，mysql文件夹下有users.txt数据表结构，导入到MySQL中
###### npm install 
###### npm start
# 文件夹目录
## 1.mysql目录
   放操作数据库的方法的
## 2.routes目录
  ###### index.js 为路由入口文件，其余的为子路由。
# 整理一下思路
## 1.当用户打开主页时，如果用户未登录，重定向到登录页：
 ###### 如何判断用户是否登录？
 ###### 通过cookie-session这个中间件，判断req.session['seesion_id']是否存在。
 ###### 通过res.redirect('地址')，从定向到指定位置。
## 2.用户注册成功后，跳转到登录页。
![login](https://github.com/zjfcool/node-test/blob/master/public/images/login.png)
###### 注册时表单验证运用了Proxy,正好感受一下es6语法；
###### 点击提交后，就开始数据库增删改查语句的运用，这部分数据库操作就放到了mysql中通过传递一个回调函数来执行接下来的操作；
###### 函数结构为function(username,password,callback){...}；
###### 不过这里给密码进行了MD5加密，运用了node的crypto模块，将这个公共方法封装了一下放到了common目录下；
## 3.用户登录成功后，跳转到主页。
###### 用户登录跟注册大同小异，跳转主页后有欢迎 *** 登录，这里的名字是通过数据库查询到的数据存储到session中，在将session数据传递到ejs模板中。
## 4.主页
###### 现在只有导航。。。，点击退出后，将清除session。

