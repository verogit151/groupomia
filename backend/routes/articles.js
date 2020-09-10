const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const articleCtrl = require('../controllers/article')

router.get('/:id', auth, articleCtrl.getAllArticle)
router.get('/comments/:id', auth, articleCtrl.getAllComment)
router.post('/', auth, articleCtrl.createArticle)
router.post('/comment', auth, articleCtrl.addComment)
router.put('/:id', auth, multer, articleCtrl.addImage)
router.delete('/:id', auth, articleCtrl.deleteArticle)
router.delete('/comment/:id', auth, articleCtrl.deleteComment)
router.post('/like', auth, articleCtrl.likeArticle)
router.post('/dislike', auth, articleCtrl.dislikeArticle)

module.exports = router