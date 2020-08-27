const Article = require('../models/article.model')

//Ajout d'un article
exports.createArticle = (req, res, next) => {
    console.log("controller")
    const reqArticle = req.body.article
    console.log("req.file.image:" + req.image)
    //Validation de la requête
    if (!reqArticle) {
      res.status(400).send({
        message: "L'article ne peut être vide!"
      })
    }
    
    const article = new Article({
      content: reqArticle.content,
      imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.image}`,
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
  Article.getAll((err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting the articles."
    })
  else res.send(data)
  })
}