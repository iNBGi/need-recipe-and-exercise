const mongoose = require('mongoose')
const CoachSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
})
mongoose.model("coach",CoachSchema)