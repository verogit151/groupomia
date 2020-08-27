const sql = require("../bddConnect.js")

// constructor
const Article = function(article) {
  this.content = article.content
  this.imageURL = article.imageURL
  this.videoURL = article.videoURL
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

    console.log("Article créé: ", { id: res.insertId, ...newArticle })
    result(null, { id: res.insertId, ...newArticle })
    return
  })
}

// User.findByEmail = (emailUser, result) => {
//   sql.query(`SELECT * FROM users WHERE email = "${emailUser}"`, (err, res) => {
//     if (err) {
//       console.log("error: ", err)
//       result(err, null)
//       return
//     }
//     else {
//         if (res.length > 0) {
//             console.log("Utilisateur trouvé: ", res[0])
//             result(null, res[0])
//             return
//         }
//     }
    
    
    // else {
    //     // not found User with the email
    //     result({ kind: "not_found" }, null)
    // }
//   })
// }

Article.getAll = result => {
  sql.query("SELECT * FROM articles", (err, res) => {
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

module.exports = Article