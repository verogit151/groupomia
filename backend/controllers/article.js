const Article = require('../models/article.model')
const ArticleU = require('../models/articleU.model')
const Comment = require('../models/comment.model')
const CommentU = require('../models/commentU.model')
const Like = require('../models/like.model')
const fs = require('fs')
// const { faSadCry } = require('@fortawesome/free-solid-svg-icons')

//Ajout d'un article
exports.createArticle = (req, res, next) => {
    const reqArticle = req.body.article
    console.log("reqArticle.date:" + reqArticle.date)
    //Validation de la requête
    if (!reqArticle) {
      res.status(400).send({
        message: "L'article ne peut être vide!"
      })
    }
    
    const article = new Article({
      content: reqArticle.content,
      imageURL: `NULL`,
      author_users_id: reqArticle.author_users_id,
      date: reqArticle.date
    })
  
    // Save Customer in the database
    Article.create(article, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        })
      else res.send(data)
    })
}

//Affichage des articles
exports.getAllArticle = (req, res, next) => {
  ArticleU.getAll(req.params.id, (err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting the articles."
    })
  else res.send(data)
  })
}

//Ajout d'un commentaire
exports.addComment = (req, res, next) => {
  const reqComment = req.body.comment
  //Validation de la requête
  if (!reqComment) {
    res.status(400).send({
      message: "Le commentaire ne peut être vide!"
    })
  }
  
  const comment = new Comment({
    articles_id: reqComment.articles_id,
    comment: reqComment.comment,
    author_users_id: reqComment.author_users_id,
    date: reqComment.date
  })

  // Save Customer in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      })
    else res.send(data)
  })
}

//Affichage des commentaires
exports.getAllComment = (req, res, next) => {
  console.log("req.params.id" + req.params.id)
  CommentU.getAll(req.params.id, (err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting the articles."
    })
  else res.send(data)
  })
}

exports.addImage = (req, res, next) => {
  console.log(req.params.id)
  const imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  Article.createImage(req.params.id, imageURL, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the articles."
      })
    else res.send(data)
  })
}

//Supprimer un article
exports.deleteArticle = (req, res) => {
  Article.getOne(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the article."
      })
    else {
      const result=JSON.parse(JSON.stringify(data))
      const filename = result[0].imageURL.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Article introuvable`
              })
            } else {
              res.status(500).send({
                message: "Erreur de suppression de l'article " + err.message
              })
            }
          } else {
            res.send(data)
          }
        })
      })
    }
  })
}

//Supprimer un commentaire
exports.deleteComment = (req, res) => {
  Comment.deleteOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Commentaire introuvable`
          })
        } else {
          res.status(500).send({
            message: "Erreur de suppression du commentaire " + err.message
          })
        }
      } else {
        res.send(data)
      }
  })
}

//Liker un article
exports.likeArticle = (req, res) => {
  const reqLike = req.body.like
  //Validation de la requête
  if (!reqLike) {
    res.status(400).send({
      message: "La requête ne peut être vide!"
    })
  }
  const like = new Like({
    articles_id: reqLike.articles_id,
    users_id: reqLike.users_id,
  })
  Like.likeOne(like, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Article introuvable`
          })
        } else {
          res.status(500).send({
            message: "Erreur de suppression de l'article " + err.message
          })
        }
      } else {
        res.send(data)
      }
  })
}
//disliker un article
exports.dislikeArticle = (req, res) => {
  const reqDislike = req.body.dislike
  //Validation de la requête
  if (!reqDislike) {
    res.status(400).send({
      message: "La requête ne peut être vide!"
    })
  }
  Like.dislikeOne(reqDislike.articles_id, reqDislike.users_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Article introuvable`
          })
        } else {
          res.status(500).send({
            message: "Erreur de suppression de l'article " + err.message
          })
        }
      } else {
        res.send(data)
      }
  })
}