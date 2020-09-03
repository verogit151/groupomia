const Article = require('../models/article.model')
const ArticleU = require('../models/articleU.model')
const Comment = require('../models/comment.model')
const CommentU = require('../models/commentU.model')
const Like = require('../models/like.model')

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
      imageURL: `image`,//`${req.protocol}://${req.get('host')}/images/${req.file.image}`,
      videoUrl: `video`,//`${req.protocol}://${req.get('host')}/videos/${req.file.video}`,
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
  ArticleU.getAll((err, data) => {
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
  const userId = req.body.userId
  const like = req.body.like
  const articles_id = req.params.id
  console.log("userId" + req.body.userId)
  console.log("like" + req.body.like)
  console.log("articles_id" + req.params.id)
  Like.likeOne(req.params.id, (err, data) => {
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
// exports.likeSauce = (req, res, next) => {
//   const userId = req.body.userId;
//   const like = req.body.like;
//   Sauce.findOne({ _id: req.params.id })
//       .then((sauce) => {
//           switch (like) {
//               case 1 : //like la sauce
//                   //Vérification de l'absence de l'utilisateur dans le tableau des likes
//                   if (sauce.usersLiked.indexOf(userId) === -1) {
//                       if (sauce.usersDisliked.indexOf(userId) > -1) { 
//                           // suppression du tableau des dislikes si présent 
//                           sauce.dislikes --;
//                           sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
//                       }
//                       sauce.usersLiked.push(userId);
//                       sauce.likes ++;
//                       const sauceObject = { ...sauce._doc, };
//                       Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
//                           .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//                           .catch(error => res.status(400).json({ error }));
//                   }
//                   else return res.status(405).send(new Error('Not allowed!'));
//                   break;
//               case -1 : //disike la sauce
//                   //Vérification de l'absence de l'utilisateur dans le tableau des dislikes
//                   if (sauce.usersDisliked.indexOf(userId) === -1) { 
//                       if (sauce.usersLiked.indexOf(userId) > -1) {
//                           // suppression du tableau des likes si présent
//                           sauce.likes --;
//                           sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
//                       }
//                       sauce.usersDisliked.push(userId);
//                       sauce.dislikes ++;
//                       const sauceObject = { ...sauce._doc, };
//                       Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
//                           .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//                           .catch(error => res.status(400).json({ error }));
//                   }
//                   else return res.status(405).send(new Error('Not allowed!'));
//                   break;
//               case 0 : 
//                   //suppression du like sinon dislike
//                   if (sauce.usersLiked.indexOf(userId) > -1) {
//                       sauce.likes --;
//                       sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
//                   }
//                   else if (sauce.usersDisliked.indexOf(userId) > -1) {
//                       sauce.dislikes --;
//                       sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
//                   }
//                   else return res.status(405).send(new Error('Not allowed!'));
//                   const sauceObject = { ...sauce._doc, };
//                   Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
//                       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//                       .catch(error => res.status(400).json({ error }));
//                   break;
//               default : res.status(500).json({ error });
//           }
//       })
//       .catch((error) => res.status(500).json({ error }));
// }