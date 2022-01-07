//import model Merk

const Merk = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let merk = new Merk(payload);

    await merk.save();
    return res.json({status: 'success',
                message: 'tambah Merk',
                data:merk});
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
    let merks = await Merk.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json({status: 'success',
            message: 'List Merk',
            data:merks})
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let merk = await Merk.findOneAndDelete({_id: req.params.id});
        return res.json({status: 'success',
                message: 'Hapus Merk',
                data:merk});
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let merk = await Merk.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json({status: 'success',
        message: 'Update Merk',
        data:merk});
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