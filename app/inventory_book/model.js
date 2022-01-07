const mongoose = require('mongoose');
//ambil modul model dan schema dari package mongoose
const {model, Schema} = mongoose;

const inventoryBookSchema = Schema({
    parent_number:{
        type:String,
        minlength:[3, 'Panjang nomor induk minimal 3 karakter'],
        maxlength:[255,'Panjang nomor induk maksimal 255 karakter'],
        required: [true, 'Nomor induk harus diisi']
    },
    goods_code: {
        type: String, 
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    good: {
        type: Schema.Types.ObjectId, 
        ref: 'Good'
        },
    merk:{
        type:Schema.Types.ObjectId,
        ref:'Merk'
    },
    type:{
        type:Schema.Types.ObjectId,
        ref:'Type'
    },
    size:{
        type:String,
        minlength:[3, 'Panjang ukuran minimal 3 karakter'],
        maxlength:[255,'Panjang ukuran maksimal 255 karakter'],
        required: [true, 'Ukuran harus diisi']
    },
    production_year:{
        type:Date,
        required: [true, 'Tahun Pembuatan harus diisi']
    },
    fund:{
        type:Schema.Types.ObjectId,
        ref:'Type'
    },
    document:{
        type:String,
        minlength:[3, 'Panjang kelengkapan Dokument minimal 3 karakter'],
        maxlength:[255,'Panjang Kelengkapan maksimal 255 karakter']
    },
    amount_goods:{
        type:Number,
        required: [true, 'Banyak harus diisi']
    },
    condition:{
        type:Number,
        required: [true, 'Kondisi harus diisi']
    },
    price:{
        type:Number,
        required:[true, 'Harga wajib diisi']
    },
    price_total:{
        type:Number,
        required:[true,'Harga Total Wajib diisi']
    },
    goods_position:{
        type:String,
        minlength:[3, 'Panjang Posisi Ruangan minimal 3 karakter'],
        maxlength:[255,'Panjang Posisi Ruangan maksimal 255 karakter'],
        required: [true, 'Posisi barang harus diisi']
    },
    description:{
        type:String,
        minlength:[3, 'Panjang Deskripsi Ruangan minimal 3 karakter'],
        maxlength:[255,'Panjang Deskripsi Ruangan maksimal 255 karakter'],
    }
},{timestamps:true})

module.exports = model('inventoryBook',inventoryBookSchema);

