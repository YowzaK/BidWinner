const mongoose = require("mongoose");

const Face = new mongoose.Schema({
    faces: [{
        userId: String,
        pictureLocation: String
    }]
})

module.exports = mongoose.model("Faces", Face);