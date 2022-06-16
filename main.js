var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
const express = require('express');
const req = require('express/lib/request');
const { response } = require('express');
const app = express()
const port = 3000

app.use(express.static('public'))// 정적인 파일 서비스
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request,response,next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/topic', topicRouter);

// route, routing : 방향을 잡는것
// app.get('/', (req, res) => {res.send('Hello World!')})
app.get('/', function(request, response){
  
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
  
});




app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) { // 오류 -> 인자가 4개인 middleware를 호출하도록 약속되어있다. 
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./lib/template.js');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){

//       } else {
//         
//       }
//     } else if(pathname === '/create'){
//       
//     } else if(pathname === '/create_process'){

//     } else if(pathname === '/update'){

//     } else if(pathname === '/update_process'){

//     } else if(pathname === '/delete_process'){

//     } else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// });
// app.listen(3000);
