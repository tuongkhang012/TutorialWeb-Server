const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name: { type:String },
    noStudents: { type:Number },
    sort: { type:Number },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('School', schoolSchema);