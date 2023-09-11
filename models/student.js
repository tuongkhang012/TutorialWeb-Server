import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    school_year: Number,
    height: Number,
    birth_day: String,
    sex: Boolean,
    school: String,
    sort: Number,
    equipments: [{
        equipmentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment'
        }
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('Student', studentSchema);