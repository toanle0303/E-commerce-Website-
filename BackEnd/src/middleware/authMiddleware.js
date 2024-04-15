const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

const commentAuthMiddleware = (req, res, next) => {
    try {
      // Lấy token từ header
      const token = req.headers.authorization.split(' ')[1];
  
      // Kiểm tra xem token có hợp lệ không
      jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed',
            status: 'ERROR',
          });
        }
  
        // Kiểm tra xem user có quyền admin hay không
        if (user?.isAdmin) {
          next();
        } else {
          return res.status(403).json({
            message: 'Insufficient permissions',
            status: 'ERROR',
          });
        }
      });
    } catch (error) {
      console.error('Error in commentAuthMiddleware:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 'ERROR',
      });
    }
  };
  

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    commentAuthMiddleware
}