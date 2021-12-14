//import package mongoose
const mongoose = require('mongoose');

// kita import konfigurasi terkait mongoDB dari app/config.js
const {dbHost, dbName, dbPort, dbUser, dbPass} = require('../app/config');

//connect mongodb menggunakan konfigurasi yang telah kita import
// console.log(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`);
mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
    {useNewUrlParser:true, useUnifiedTopology:true});

    // simpan koneksi dalam konstan db
const db = mongoose.connection;

//export db supaya bisa dipake di file lain
module.exports= db;