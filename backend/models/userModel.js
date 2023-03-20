const mongoose = require('mongoose'); // Erase if already required
const validator=require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        minLength:[4,"Name must be more than 3 characters"],
        maxLength:[20,"Name does not exceed 20 characters"]
        
    },
    email:{
        type:String,
        required:[true,"Please Enter a email address"],
        validate:[validator.isEmail,"Please enter a valid email address"],
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:["Please enter Password"],
        minLength:[6,"Password must be at least 5 characters"],
        maxLength:[20,"Password does not exceed 20 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordTme:Date,
});

//hash password
userSchema.pre('save',async function(next){
    const hash= await bcrypt.hash(this.password, 10);
    this.password=hash
    next();
});
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}
// compare password
userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);