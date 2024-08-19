const { verifyToken } = require("../helper/jwt")
const { User } = require("../models");

async function authenthication(req, res, next){
    try {
        // console.log(req.headers.authorization, '<<<<< Authen')
        let access_token = req.headers.authorization
        if(!access_token){
            throw{name: 'Invalid Token'}
        }
        
        let [type, token] = access_token.split(" ")
        if(type !== "Bearer"){
            console.log(access_token, 'aaaaaaa')
            throw{name: 'Unauthenticated'}
        }
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
      
        if(!user){
            throw {name : 'Invalid Token'}
        }

        req.user = {
            id : user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        next()
    } catch (error) {
        // console.log(error);
        next(error)
    }
}


module.exports = authenthication