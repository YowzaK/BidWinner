const mongoose = require("mongoose");

const bidsPlacedOnItem = new mongoose.Schema({
  bid: {
    type: Number,
  },
  userId: {
    type: String,
  },
});

const Item = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bids: [
    {
      bid: Number,
      userId: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  currentBids: {
    type: Number,
  },
  bidWinner: {
    type: String,
  },
});
module.exports = mongoose.model("items", Item);
