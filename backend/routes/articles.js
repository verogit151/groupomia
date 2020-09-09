const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')

const articleCtrl = require('../controllers/article')

router.get('/:id', articleCtrl.getAllArticle)
router.get('/comments/:id', articleCtrl.getAllComment)
router.post('/', articleCtrl.createArticle)
router.post('/comment', articleCtrl.addComment)
router.put('/:id', multer, articleCtrl.addImage)
router.delete('/:id', articleCtrl.deleteArticle)
router.delete('/comment/:id', articleCtrl.deleteComment)
// router.get('/like/:id', articleCtrl.getLikeArticle)
router.post('/like', articleCtrl.likeArticle)
router.post('/dislike', articleCtrl.dislikeArticle)

module.exports = router