const sql = require("../bddConnect.js")

// constructor
const ArticleU = function(article) {
  this.articles_id = article.articles_id
  this.content = article.content
  this.imageURL = article.imageURL
  this.author_users_id = article.author_users_id
  this.date = article.dateform
  this.user = article.user
  this.likeArticle = article.likeArticle
  this.totalLikes = article.totalLikes
}

ArticleU.getAll = (id, result) => {
  sql.query("SELECT articles.id as articles_id, content, imageURL, author_users_id, DATE_FORMAT(date,'%d/%m/%Y') as dateform, concat(firstname,' ',surname) as user, likes.id as likeArticle, (SELECT COUNT(*) FROM likes AS total WHERE total.articles_id=articles.id) as totalLikes FROM articles INNER JOIN users ON author_users_id=users.id LEFT OUTER JOIN likes ON likes.users_id = ? AND likes.articles_id=articles.id ORDER BY date DESC", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("articles: ", res)
    result(null, res)
  })
}

module.exports = ArticleU