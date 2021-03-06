module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },

  list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },

  authorSelect:function(authors)
  {
    var tag = '';
    var i = 0;
    while(i < authors.length)
    {
      tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
      i++;
    }
    return `
      <select name="author_id">
        ${tag}
      </select>
    `
  },

  //본문
  authorBoby:function(authors)
  {
      var tag = '<table> <tr><td>title</td> <td>profile</td> <td>update</td> <td>delete</td></tr>';
      var i = 0;
      while(i < authors.length)
      {
          tag += `
          <tr>
            <td>${authors[i].name}</td>
            <td>${authors[i].profile}</td>
            <td><a href="/author/update?id=${authors[i].id}"> update </a></td>
            <td>
                <form action="/author/delete_process" method="POST">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
                </form>
            </td>
          </tr>`;
          i++;
      }
      tag += `</table>`;
      return tag;
  }
}
