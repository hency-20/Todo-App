const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending","in-progress","completed"],
        default: "pending",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("task", taskSchema);