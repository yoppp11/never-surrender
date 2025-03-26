function errorMiddleware(err, req, res, next){
    if(err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError'){
        res.status(400).json({message: err.errors[0].message})
    }

    if(err.name === 'BadRequest') res.status(400).json({message: err.message})
    if(err.name === 'Unauthorized') res.status(401).json({message: err.message})
    if(err.name === 'JsonWebTokenError') res.status(401).json({message: err.message})
}

module.exports = {
    errorMiddleware
}