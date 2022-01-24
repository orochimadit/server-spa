const {getToken} = require ('../utils/get-token');
const config = require('../config');
const jwt = require ('jsonwebtoken');
const User = require('../user/model');

function decodeToken(){
    return async function(req, res, next){
        try {
            let token = getToken(req);
            if(!token) return next();
            req.user = jwt.verify(token, config.secretKey);
            let user = await User.findOne({token:{$in:[token]}})

            //token expired jika user tidak ditemukan
            if(!user){
                return res.json({
                    error:1,
                    message:'token expired'
                });
            }
        } catch (err) {
            if(err && err.name=='JsonWebTokenError'){
                return res.json({
                    error:1,
                    message:err.message
                })
            }
            //tangani error lainnya
            next(err);
        }
    }
}

module.exports ={
    decodeToken
}