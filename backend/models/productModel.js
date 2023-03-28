const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter The Name OF The Product"],
        trim:true,
        maxLength:[20,"Product must be at least 20 characters"]
    },
    description:{
        type:String,
        required:[true,"Please Enter The Description"],
        maxLength:[2000,"Description Cannot more than 2000 characters"],

    },
    price:{
        type:Number,
        required:[true,"Please Enter The Price"],
        maxLength:[7,"Price must be at least 7 characters"],
    },
    discountPrice:{
        type:String,
        maxLength:[4,"Discount Price must be at least 4 characters"],
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true,
        },
    }],
    category:{
        type:String,
        required:[true,"Please add a Categorhy"],
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Stock"],
        maxLength:[3,"Stock must be at least 3 characters"],
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[{
        user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            
        },
        name:{
            type:String,
            
        },
        rating:{
            type:Number,
            
        },
        comment:{
            type:String,
        },
        time:{
            type:Date,
            default:Date.now()
        },
    }],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        

    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

//Export the model
module.exports = mongoose.model('product', productSchema);