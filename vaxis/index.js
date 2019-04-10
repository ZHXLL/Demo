var express = require("express");
var app = express();
// var cors = require("cors");

// app.use(cors());
app.use('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    if (req.method == 'OPTIONS') {
        next(); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。\ next();
    }
    else {
      next();
    }
  });

app.get("/",function (req,res){
    res.json({
        name:"12"
    })
})
app.listen(5555)