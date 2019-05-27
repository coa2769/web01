var express = require('express');
var router = express.Router();

var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
var fs = require('fs');
var template = require('../lib/template.js');

router.get('/create', function(request, response){
  var title = 'WEB - create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');

  response.send(html);
});

router.post('/create_process', function(request, response){
  var post = request.body;
  fs.writeFile(`data/${post.title}`, post.description, 'utf8', function(err){
    response.redirect(`/topic/${post.title}`);
  });
});

router.get('/update/:pageName', function(request, response){
  var pageName = request.params["pageName"];

  var filteredId = path.parse(pageName).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var list = template.list(request.list);
      var html = template.HTML(pageName, list,
        `
        <form action="/topic/update_process" method="post">
          <input type="hidden" name="id" value="${pageName}">
          <p><input type="text" name="title" placeholder="title" value="${pageName}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/topic/create">create</a> <a href="/topic/update/${pageName}">update</a>`
      );
      response.writeHead(200);
      response.end(html);
  });
});

router.post('/update_process', function(request, response){
  var post = request.body;
  fs.rename(`data/${post.id}`, `data/${post.title}`, function(error){
      fs.writeFile(`data/${post.title}`, post.description, 'utf8', function(err){
          response.redirect(`/topic/${post.title}`);
      });
  });
});

router.post('/delete_process', function(request, response){
  var post = request.body;
  var filteredId = path.parse(post.id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect(`/`);
  });
});

router.get('/:pageName', function(request, response){
    var pageName = request.params["pageName"];
    var filteredId = path.parse(pageName).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          if(err){
              next(err);
          }
          else{
              var sanitizedTitle = sanitizeHtml(pageName);
              var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
              });
              var list = template.list(request.list);
              var html = template.HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                ` <a href="/topic/create">create</a>
                  <a href="/topic/update/${sanitizedTitle}">update</a>
                  <form action="/topic/delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                  </form>`
              );
              response.send(html);
          }
    });
});

module.exports = router;