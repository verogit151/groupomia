const sql = require("../bddConnect.js")

// constructor
const Comment = function(comment) {
  this.articles_id = comment.articles_id
  this.comment = comment.comment
  this.author_users_id = comment.author_users_id
  this.date = comment.date
}

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Commentaire créé: ", { id: res.insertId, ...newComment })
    result(null, { id: res.insertId, ...newComment })
    return
  })
}

Comment.deleteOne = (id, result) => {
  sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows == 0) {
      // not found comment with the id
      result({ kind: "not_found" }, null)
      return
    }
    console.log("deleted comment with id: ", id)
    result(null, res)
  })
}


module.exports = Comment