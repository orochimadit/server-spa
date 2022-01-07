//import model divisi

const Good = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let good = new Good(payload);

    await good.save();
    return res.json({status:'success',
            message:'Simpan Barang ',
            data:good});
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
    let goods = await Good.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json({status:'success',
    message:'List Barang ',
    data:goods})
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let good = await Good.findOneAndDelete({_id: req.params.id});
        return res.json({status:'success',
        message:'Delete Barang ',
        data:good});
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let good = await Good.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json({status:'success',
        message:'Edit Barang ',
        data:good});
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