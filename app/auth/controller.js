const config = require('../config');
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
async function localStrategy(email, password, done){
    try {
      
      //cari user ke mongodb
        let user = await User.findOne({email})
                    .select('-__v -createdAt -updatedAt -token')
        // jika user tidak ditemukan akhiri proses login
        if (!user) return done();
        // sampai sini artinya user di temukan cek password sesuai atau tidak

        if(bcrypt.compareSync(password,user.password)){
            ({password, ...userWithoutPassword} = user.toJSON());

            //akhiri pengecekan user berhasil login dan berikan data user tanpa password
            return done(null, userWithoutPassword)
        }
    } catch (err) {
        done(err,null);
    }
    done();
}

async function login(req,res,next){
    passport.authenticate('local',async function(err, user){
        if (err) return next(err);

        if(!user) return res.json({error:1, message: 'email or password incorrect'})

        //buat json web token
        let signed = jwt.sign(user,config.secretKey);

        await User.findOneAndUpdate({_id:user._id},{$push:{token:signed}},{new:true});

        //response ke client
        return res.json({
            message:'logged in successfully',
            user:user,
            token:signed
        })
    })(req, res, next)
}
module.exports ={
    register,
    localStrategy,
    login
}