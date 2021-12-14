const mongoose = require('mongoose');
//ambil modul model dan schema dari package mongoose
const {model, Schema} = mongoose;

const divisionSchema = Schema({
    name:{
        type:String,
        minlength:[3, 'Panjang nama divisi minimal 3 karakter'],
        maxlength:[255,'Panjang nama divisi maksimal 255 karakter'],
        required: [true, 'Nama divisi harus diisi']
    },
    description: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    image_url : String
},{timestamps:true})

module.exports = model('division',divisionSchema);

