//import model divisi

const Division = require('./model');

async function store (req,res,next){
    //tangkap data yg dikirim dari form oleh client sebagai variabel payload
    try{
    let payload = req.body;
    let division = new Division(payload);

    await division.save();
    return res.json(division);
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
    let divisions = await Division.find()
                            .limit(parseInt(limit))
                            .skip(parseInt(skip));
    return res.json(divisions)
    }
    catch (err){
        next(err);
    }
}
async function destroy (req, res, next){
    try{
        let division = await Division.findOneAndDelete({_id: req.params.id});
        return res.json(division);
    }
    catch(err){
        next(err);
    }
}
module.exports = {store,index,destroy}