const sql = require("../bddConnect.js")

// constructor
const User = function(user) {
  this.email = user.email
  this.password = user.password
  this.surname = user.surname
  this.firstname = user.firstname
  this.karma = user.karma
  this.role_id = user.role_id
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Utilisateur créé: ", { id: res.insertId, ...newUser })
    result(null, { id: res.insertId, ...newUser })
    return
  })
}

User.findByEmail = (emailUser, result) => {
  sql.query(`SELECT * FROM users WHERE email = "${emailUser}"`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    else {
        if (res.length > 0) {
            console.log("Utilisateur trouvé: ", res[0])
            result(null, res[0])
            return
        }
    }
  })
}

User.findOne = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = "${userId}"`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    else {
        if (res.length > 0) {
            console.log("Utilisateur trouvé: ", res[0])
            result(null, res[0])
            return
        }
    }
  })
}

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET firstname = ?, surname = ? WHERE id = ?",
    [user.firstname, user.surname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // user non trouvé 
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated user: ", { id: id, ...user })
      result(null, { id: id, ...user })
    }
  )
}
    
// Customer.getAll = result => {
//   sql.query("SELECT * FROM customers", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("customers: ", res);
//     result(null, res);
//   });
// };



User.deleteOne = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null)
      return
    }
    console.log("deleted user with id: ", id);
    result(null, res)
  })
}

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

module.exports = User