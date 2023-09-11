import mongoose from "mongoose"

const schoolSchema = new mongoose.Schema({
    name: String,
    noStudents: Number,
    sort: Number,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('School', schoolSchema);