const sql = require("../bddConnect.js")

// constructor
const Like = function(like) {
  this.articles_id = like.articles_id
  this.users_id = like.users_id
}

Like.likeOne = (newLike, result) => {
  sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Like créé: ", { id: res.insertId, ...newLike })
    result(null, { id: res.insertId, ...newLike })
    return
  })
}

Like.getLike = (articles_id, result) => {
  console.log("articles_id:" + articles_id)
  sql.query("SELECT count(*) as totalLikes FROM likes WHERE articles_id = ?", articles_id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

Like.dislikeOne = (articles_id, users_id, result) => {
  sql.query("DELETE FROM likes WHERE articles_id=? AND users_id=?", [articles_id, users_id], (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Article dislike")
    result(null, res)
    return
  })
}
module.exports = Like