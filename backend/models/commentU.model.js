const sql = require("../bddConnect.js")

const CommentU = function(comment) {
  this.comment_id = comment.comment_id
  this.articlesId = comment.articles_id
  this.comment = comment.comment
  this.author_users_id = comment.author_users_id
  this.user = comment.user
  this.date = comment.dateform
}

CommentU.getAll = (id, result) => {
    sql.query("SELECT comments.id as comment_id, articles_id, comment, author_users_id, DATE_FORMAT(date,'%d/%m/%Y') as dateform, concat(firstname,' ',surname) as user FROM comments INNER JOIN users ON author_users_id=users.id WHERE articles_id = ? ORDER BY date DESC", id, (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }
  
      console.log("comments: ", res)
      result(null, res)
    })
  }

// Customer.remove = (id, result) => {
//   sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Customer with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted customer with id: ", id);
//     result(null, res);
//   });
// };


module.exports = CommentU