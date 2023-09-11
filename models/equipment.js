import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: String,
    type: String,
    tier: Number,
    sort: Number,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('Equipment', equipmentSchema);