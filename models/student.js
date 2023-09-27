const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type:String },
    age: { type:Number },
    school_year: { type:Number },
    height: { type:Number },
    birth_day: { type:String },
    sex: { type:Boolean },
    school: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    }],
    sort: { type:Number },
    equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Student', studentSchema);