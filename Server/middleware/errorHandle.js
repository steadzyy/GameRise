module.exports = function errorHandle(error, req, res, next){
    // console.log(error.name, 'ssssss');
    let status = error.status || 500;
    let message = error.message || "Internal server error";
    
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeConstraintError':
            status = 400;
            message = error.errors[0].message;
            break;
        case 'User not found':
            status = 404 ;
            message = 'User not found';
            break;
        case 'Invalid email format':
            status = 400 ;
            message = 'Invalid email format';
            break;
        case 'Invalid email/password':
            status = 401 ;
            message = 'Invalid email/password';
            break;
        case 'Games not found':
            status = 404 ;
            message = 'Games not found';
            break;
        case 'Genre not found':
            status = 404 ;
            message = 'Genre not found';
            break;
        case 'Unauthenticated':
            status = 401 ;
            message = 'Unauthenticate';
            break;
        case 'Invalid Token':
        case 'JsonWebTokenError':
            status = 401 ;
            message = 'Invalid Token';
            break;
        case 'Forbidden':
            status = 403 ;
            message = 'Forbidden';
            break;
        default:
            break;
    }
    res.status(status).json({message: message})
}