//import model divi

const Material = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let material = new Material(payload);

    await material.save();
    return res.json(material);
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
    let materials = await Material.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json(materials)
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let material = await Material.findOneAndDelete({_id: req.params.id});
        return res.json(material);
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let material = await Material.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json(material);
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