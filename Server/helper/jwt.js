const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
// console.log(JWT_SECRET,"!!!!!!");
const signToken =  (user)=>{
    return jwt.sign ({id: user.id, email: user.email, role: user.role}, JWT_SECRET)
}
const verifyToken = (token)=>{
    return jwt.verify(token, JWT_SECRET)
}
module.exports = {signToken, verifyToken}