const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
    name: { type:String },
    type: { type:String },
    tier: { type:Number },
    sort: { type:Number },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Equipment', equipmentSchema);