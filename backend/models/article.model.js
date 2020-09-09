const sql = require("../bddConnect.js")

// constructor
const Article = function(article) {
  this.content = article.content
  this.imageURL = article.imageURL
  this.author_users_id = article.author_users_id
  this.date = article.date
}

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    else {
      console.log("Article créé: ", { id: res.insertId, ...newArticle })
      result(null, { id: res.insertId, ...newArticle })
      return
    }
  })
}

Article.createImage = (id, url, result) => {
  sql.query(
    "UPDATE articles SET imageURL = ? WHERE id = ?",
    [url, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return;
      }

      if (res.affectedRows == 0) {
        // not found article with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated article");
      result(null, { id: id, url:url })
    }
  )
}

Article.deleteOne = (id, result) => {
  sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows == 0) {
      // not found article with the id
      result({ kind: "not_found" }, null)
      return
    }
    console.log("deleted post with id: ", id)
    result(null, res)
  })
}

Article.getOne = (id, result) => {
  sql.query("SELECT * FROM articles WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err)
      return
    }
    if (res.affectedRows == 0) {
      // not found article with the id
      result({ kind: "not_found" }, null)
      return
    }
    result(null, res)
  })
}

module.exports = Article