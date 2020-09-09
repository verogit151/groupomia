const sql = require("../bddConnect.js")

// constructor
const User = function(user) {
  this.id = user.id
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
    else {
      newUser.id = res.insertId
      console.log("Utilisateur créé: ", { ...newUser })
      result(null, { ...newUser })
      return
    }

    
  })
}

User.findByEmail = (emailUser, result) => {
  sql.query(`SELECT users.id, email, password, surname, firstname, COUNT(likes.id) AS karma, role_id 
             FROM users 
             LEFT OUTER JOIN articles ON users.id=author_users_id
             LEFT OUTER JOIN likes ON articles_id=articles.id 
             WHERE email = "${emailUser}" GROUP BY users.id`, (err, res) => {
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
        else {
          console.log("utilisateur non trouvé: ")
          result(err, null)
          return
        }
    }
  })
}

User.findOne = (userId, result) => {
  sql.query(`SELECT users.id, email, password, surname, firstname, COUNT(likes.id) AS karma, role_id FROM users LEFT OUTER JOIN likes ON users.id=users_id WHERE users.id = "${userId}" GROUP BY users.id`, (err, res) => {
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

User.findAll = result => {
  console.log("requete")
  sql.query(`SELECT * FROM users`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    else {
        result(null, res)
        return
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

module.exports = User