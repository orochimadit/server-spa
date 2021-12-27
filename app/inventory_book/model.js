const mongoose = require('mongoose');
//ambil modul model dan schema dari package mongoose
const {model, Schema} = mongoose;

const inventoryBookSchema = Schema({
    parent_number:{
        type:String,
        minlength:[3, 'Panjang nama asal dana minimal 3 karakter'],
        maxlength:[255,'Panjang nama asal dana maksimal 255 karakter'],
        required: [true, 'nama asal dana harus diisi']
    },
    goods_code: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    goods: {
        type: Schema.Types.ObjectId, 
        ref: 'Good'
        }
},{timestamps:true})

module.exports = model('fund',fundSchema);

