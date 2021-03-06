const mongoose = require('mongoose');

const {model,Schema } =mongoose;

const merkSchema = Schema({
    name:{
        type:String,
        minlength:[3, 'Panjang nama Merk minimal 3 karakter'],
        maxlength:[255,'Panjang nama Merk maksimal 255 karakter'],
        required: [true, 'Nama Merk harus diisi']
    },
    description: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    image_url : String
},{timestamps:true})

module.exports = model('merk',merkSchema);

