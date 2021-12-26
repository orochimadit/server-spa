const mongoose = require('mongoose');
//ambil modul model dan schema dari package mongoose
const {model, Schema} = mongoose;

const fundSchema = Schema({
    name:{
        type:String,
        minlength:[3, 'Panjang nama asal dana minimal 3 karakter'],
        maxlength:[255,'Panjang nama asal dana maksimal 255 karakter'],
        required: [true, 'nama asal dana harus diisi']
    },
    description: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    }
},{timestamps:true})

module.exports = model('fund',fundSchema);

