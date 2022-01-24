const User = require('../user/model')

async function register(req,res,next){
    try {
        //tangkap payload dari request
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        
        //cek kemungkinan kesalahan validasi
        if(err && err.name ==='ValidationError'){
            return res.json({
                error:1,
                message:err.message,
                fields:err.errors
            })
        }
        next(err);
    }
}

module.exports ={
    register
}