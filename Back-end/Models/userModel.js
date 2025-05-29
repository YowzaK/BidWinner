const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userBids:[{
    bid: Number,
    itemId: String
  }],
  userAuctions: {
    type: [],
  },
  userCountry:{
    type: String
  },
  userAddress:{
    type: String,
  },
  userVerified: {
    type: Boolean
  },
  wonAuctions:[String]
});

module.exports = mongoose.model("User", User);
