//import model Type

const Type = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let type = new Type(payload);

    await type.save();
    return res.json(type);
    }
    catch(err){
        if(err && err.name ==='ValidationError'){
            return res.json({
                error:1,
                message:err.message,
                fields:err.errors
            });
        }
        next(err);
    }
}

async function index(req, res, next){
    try{
    let {limit= 10, skip=0 } = req.query;
    let types = await Type.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json(types)
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let type = await Type.findOneAndDelete({_id: req.params.id});
        return res.json(type);
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let type = await Type.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json(type);
    }catch(err){
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
module.exports = {store,index,destroy,update}