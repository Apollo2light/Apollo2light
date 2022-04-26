const http = require('http');
const url = require('url');


var option={
    
    hostname:'vfx.mtime.cn',
    path:'/Video/2019/03/13/mp4/190313094901111138.mp4',
    headers:{
      'Accept':'*/*',
      'Accept-Encoding':'identity;q=1, *;q=0',
      'Accept-Language':'zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7',
      'Connection':'keep-alive',
      'pragma':'no-cache',
      'range':'bytes=0-',
      'user-agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Mobile Safari/537.36'
    }
  };

//接收html
function getHtml(res){
    return new Promise((resolve,reject) => {
        let html = '';
        res.on('data',(chunk) => {
            html += chunk;
        })
        res.on('end',(chunk) => {
            resolve(html)
        })
    })
}

// http.get(option,(resp) => {
//     getHtml(resp).then((result) => {
//         console.log(result)
//     })
// })

// 创建本地服务器来从其接收数据
const server = http.createServer((req, res) => {
    var urlObj = url.parse(req.url ,true);
    var query = urlObj.query;
    let str = JSON.stringify(query);
    str = JSON.parse(str);
    console.log(str)

    
    res.setHeader('Access-Control-Allow-Origin','*')
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end(JSON.stringify({
        data: 'Hello World!'
    }));
  
});

server.listen(8000);







