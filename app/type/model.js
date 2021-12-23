const mongoose = require('mongoose');

const {model,Schema } =mongoose;

const typeSchema = Schema({
    name:{
        type:String,
        minlength:[3, 'Panjang Type minimal 3 karakter'],
        maxlength:[255,'Panjang Type maksimal 255 karakter'],
        required: [true, 'Type harus diisi']
    },
    description: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    image_url : String
},{timestamps:true})

module.exports = model('type',typeSchema);

