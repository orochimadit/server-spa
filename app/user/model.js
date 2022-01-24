const mongoose = require('mongoose');

const {model,Schema } =mongoose;
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const HASH_ROUND

let userSchema = Schema({
    full_name:{
        type:String,
        minlength:[3, 'Panjang Nama minimal 3 karakter'],
        maxlength:[255,'Panjang Nama maksimal 255 karakter'],
        required: [true, 'Nama harus diisi']
    },
    email:{
        type:String,
        maxlength:[255,'Panjang Email maksimal 255 karakter'],
        required: [true, 'Email harus diisi']
    },
    id:{
        type:Number
    },
    password:{
        type:String,
        maxlength:[255,'Panjang Password maksimal 255 karakter'],
        required: [true, 'Password harus diisi']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    token:[String]
},{timestamps:true})
userSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('User').count({email:value});
        return !count
    } catch (error) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);
userSchema.path('email').validate(function(value){
    const emailRE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRE.test(value);
}, attr=> `${attr.value} harus merupakan email yg valid`)

userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
})

userSchema.plugin(AutoIncrement,{inc_field:'customer_id'});
module.exports = model('User',userSchema);