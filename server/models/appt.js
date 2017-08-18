const mongoose = require("mongoose")

const ApptSchema = mongoose.Schema({
    date: Date,
    time: String,
    patient: String,
    complaint: String
})

mongoose.model("Appt", ApptSchema)
