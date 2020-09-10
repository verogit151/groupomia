require('dotenv').config();
const DB_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const DB_EXPIRATION = process.env.TOKEN_EXPIRATION;

const connection = require('../bddConnect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

exports.signup = (req, res, next) => {
  let reqUser = req.body.user
  // Validate request
  if (!reqUser) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  bcrypt.hash(reqUser.password, 10)
      .then(hash => {
        // Create a User
        const user = new User({
          email: reqUser.email,
          password: hash,
          surname: reqUser.surname,
          firstname: reqUser.firstname,
          karma: 0,
          role_id: 2
        })

        // Save user in the database
        User.create(user, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            })
          else //res.send(data)

            return res.status(201).json({ 
                      userId: data.id,
                      token: jwt.sign({ userId: data.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }),
                      roleId: data.role_id,
                      firstname: data.firstname,
                      surname: data.surname,
                      karma: data.karma
                    })
        })
          //next()
      })
      .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res) => {
  let reqUser = req.body.user
  if (!reqUser) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  User.findByEmail(reqUser.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur introuvable`
        })
      } else {
        res.status(500).send({
          message: "Erreur de récupération de l'utilisateur " + err.message
        })
      }
    } else {
        bcrypt.compare(reqUser.password, data.password)
          .then(valid => {
            if (!valid) {
              res.status(401).send({ message: `Mot de passe invalide`})
            }
            else {
            res.status(200).json({
              userId: data.id,
              token: jwt.sign(
                { userId: data.id },
                DB_SECRET_KEY,
                { expiresIn: DB_EXPIRATION }
              ),
              roleId: data.role_id,
              firstname: data.firstname,
              surname: data.surname,
              karma: data.karma
            })}
          })
          .catch(error => {
            res.status(500).json({ error })})
    }
  })
}

//Affichage d'un utilisateur
exports.getOneUser = (req, res) => {
  User.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Utilisateur introuvable`
          })
        } else {
          res.status(500).send({
            message: "Erreur de récupération de l'utilisateur " + err.message
          })
        }
      } else {
        res.send(data)
      }
  })
}

//Affichage de tous les utilisateurs
exports.getAllUser = (req, res) => {
  console.log("getAllUser")
  User.findAll((err, data) => {
    console.log("findAll")
      if (err) {
          res.status(500).send({
            message: "Erreur de récupération des utilisateurs" + err.message
          })
      }
      else  res.send(data)
  })
}

//Modification de l'utilisateur
exports.modifyUser = (req, res) => {
  let reqUser = req.body.user
  if (!reqUser) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  User.updateById(req.params.id, reqUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur introuvable`
        })
      } else {
        res.status(500).send({
          message: "Erreur de modification de l'utilisateur " + err.message
        })
      }
    } else {
      res.send(data)
    } 
  })
}

//Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  User.deleteOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Utilisateur introuvable`
          })
        } else {
          res.status(500).send({
            message: "Erreur de suppression de l'utilisateur " + err.message
          })
        }
      } else {
        res.send(data)
      }
  })
}