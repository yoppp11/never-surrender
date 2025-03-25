const bcrypt = require('bcryptjs')

function hashingPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashing){
    return bcrypt.compareSync(password, hashing)
}

module.exports = {
    hashingPassword,
    comparePassword
}