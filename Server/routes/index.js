const express = require('express')
const Controller = require('../controllers/controller')
const authenthication = require('../middleware/authentication')
const authorization =  require('../middleware/authorization')
const router = express.Router()

router.get('/users', Controller.getAllUser)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login/google', Controller.googleLogin)

//Endpoint Public
router.get('/pub/games', Controller.getAllGamesPublic) 
router.get('/pub/games/:id', Controller.getGamesById) 
router.post('/which-is-better/:id' , Controller.geminiAi)

// router.post('/cek', Controller.cek)
//Authenthication
router.use(authenthication)

//Games
router.get('/games', Controller.getAllGames)
router.post('/games', authorization, Controller.addGames)
router.post('/games/:id', Controller.buyGames)

router.post('/payment', Controller.initiatePayment)
router.patch('/payment/:id', Controller.updatePayment)

router.get('/games/:id', Controller.getGamesById)
router.put('/games/:id', authorization, Controller.updateGamesById)
router.delete('/games/:id', authorization, Controller.deleteGamesById)

//Genre
router.get('/genre', Controller.getAllGenre)
router.post('/genre', authorization, Controller.addGenre)
router.get('/genre/:id', Controller.getGenreById)
router.put('/genre/:id', authorization, Controller.updateGenreById)
router.delete('/genre/:id', authorization, Controller.deleteGenreById)

module.exports = router