//import model InventoryBook

const InventoryBook = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let inventoryBook = new InventoryBook(payload);

    await inventoryBook.save();
    return res.json(inventoryBook);
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
    let inventoryBooks = await InventoryBook.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json(inventoryBooks)
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let inventoryBook = await InventoryBook.findOneAndDelete({_id: req.params.id});
        return res.json(inventoryBook);
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        let payload = req.body;
        let inventoryBook = await InventoryBook.findOneAndUpdate({_id:req.params.id},payload,{new:true,runValidators:true});
        
        return res.json(inventoryBook);
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