const mongoose = require('mongoose')
let temp = new mongoose.Schema({
    type:String,
    target: String,
    x:Number, 
    y:Number, 
    time: Number,
    keyCode: Number,
    value: String
});
const eventSchema = new mongoose.Schema({
    events:{
        type:[temp]
    },
    height:{
      type:Number
    },
    htmlCopy:{
        type: String
    },
    startTime:{
        type: Number
    },
    width:{
        type: Number
    },
    creator:{
        type:String
    },
    audio:{
        type:String
    }
})

module.exports = mongoose.model('Event', eventSchema)