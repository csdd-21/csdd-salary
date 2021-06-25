const jwt = require('jsonwebtoken')

const jwtKey = 'token_test'
const jwtSign = (data) => { 
  const token = jwt.sign(data, jwtKey, {expiresIn: 60 * 60})
  return token
}

const jwtCheck = (req, res, next) => { // token验证函数
  const token = req.headers.authorization
//   console.log('token', req.headers)
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
        console.log(err)
      res.send({
        code: '999999',
        msg: 'token无效',
        data: []
      })
    } else {
      req.jwtInfo = data
      next()
    }
  })
}

module.exports = {
  jwtSign,
  jwtCheck
}
