const mongoose = require('mongoose');

const {model,Schema } =mongoose;

const materialSchema = Schema({
    name:{
        type:String,
        minlength:[3, 'Panjang nama Bahan minimal 3 karakter'],
        maxlength:[255,'Panjang nama Bahan maksimal 255 karakter'],
        required: [true, 'Nama Bahan harus diisi']
    },
    description: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    }
},{timestamps:true})

module.exports = model('material',materialSchema);

