//import model dana

const Fund = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let fund = new Fund(payload);

    await fund.save();
    return res.json({status: 'success',
                    message: 'tambah asal dana',
                    data:fund});
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
    let funds = await Fund.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json({status:'success',
                    message:'list dana',
                    data:funds})
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let fund = await Fund.findOneAndDelete({_id: req.params.id});
        return res.json({status: 'success',
                message: 'delete success',
                data:fund});
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let fund = await Fund.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json({status: 'success',
                        message: 'edit success',
                        data:fund});
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