const { Game, User } = require("../models");

async function authorization(req, res, next){
    try {
        const id = req.user.id
        const role = req.user.role
        const gameId = req.params.id
        // console.log(req.user);
        let game = await Game.findByPk(gameId)
        // if(!game){
        //     throw {name:'Games not found'}
        // }
        if(role === 'Developer'){
            next()
        }else{
            if(game.userId !== id) {
                throw ({name: 'Forbidden'})
            }else{
                next()
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization