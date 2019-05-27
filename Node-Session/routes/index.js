var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/authLib.js');


//get : route, routing 
//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function(request, response){ 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="/images/p1.jpg" style="width:400px; display:block;">
      `,
      `<a href="/topic/create">create</a>`,
      auth.statusUI(request, response)
    );
    response.send(html);
  });

  module.exports = router;