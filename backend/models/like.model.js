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

module.exports = Like