const sql = require("../bddConnect.js")

// constructor
const ArticleU = function(article) {
  this.articles_id = article.articles_id
  this.content = article.content
  this.imageURL = article.imageURL
  this.author_users_id = article.author_users_id
  this.date = article.dateform
  this.user = article.user
}

ArticleU.getAll = result => {
  sql.query("SELECT articles.id as articles_id, content, imageURL, author_users_id, DATE_FORMAT(date,'%d/%m/%Y') as dateform, concat(firstname,' ',surname) as user FROM articles INNER JOIN users ON author_users_id=users.id ORDER BY dateform DESC", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("articles: ", res)
    result(null, res)
  })
}















// Customer.updateById = (id, customer, result) => {
//   sql.query(
//     "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
//     [customer.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };

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

// Customer.removeAll = result => {
//   sql.query("DELETE FROM customers", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} customers`);
//     result(null, res);
//   });
// };

module.exports = ArticleU