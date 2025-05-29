const { initializeApp } = require("firebase/app");
const fbConfig = require("../Configs/firebase.config");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
initializeApp(fbConfig.firebaseConfig);
const axios = require("axios");
const Item = require("../Models/ItemModel");
const User = require("../Models/userModel");
const Face = require("../Models/faceModel");
var DateCalculator = require("date-calculator");
const storage = getStorage();

//adds a given image to firebase storage
const addImage = async (req, res) => {
  try {
    const storageRef = ref(storage, req.params.itemID);
    const metadata = {
      contentType: req.files.foo.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.files.foo.data,
      metadata
    );
    const downloadUrl = await getDownloadURL(snapshot.ref);
    res.status(200).json({ downloadUrl });
  } catch (error) {
    res.status(409).send(error.message);
  }
};

//adds a new auction item to mongodb
const addNewItem = async (req, res) => {
  try {
    const newItem = new Item({
      id: req.body.id,
      userId: req.body.userId,
      bids: req.body.bids,
      image: req.body.image,
      category: req.body.category,
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      startingBid: req.body.startingBid,
      endingDate: req.body.endingDate,
      currentBids: req.body.currentBids,
      bidWinner: req.body.bidWinner,
    });
    const savedItem = await newItem.save();
    User.findOneAndUpdate(
      { userId: savedItem.userId },
      { $push: { userAuctions: savedItem.id } },
      { new: true }
    ).then(
      () => {},
      (error) => {}
    );
    res.status(200).json({ messgae: "succesfully stored" });
  } catch (error) {
    res.status(409).send(error.message);
  }
};

//adds new user to mongoDB
const addNewUser = async (req, res) => {
  try {
    const newUser = User({
      userId: req.body.userId,
      userName: req.body.userName,
      userBids: req.body.userBids,
      userAuctions: req.body.userAuctions,
      userCountry: req.body.userCountry,
      userAddress: req.body.userAddress,
      userVerified: req.body.userVerified,
      wonAuctrions: req.body.wonAuctrions,
    });
    const savedUser = await newUser.save();

    res.status(200).json({ message: "succesfully stored" });
  } catch (error) {
    res.status(409).send(error.message);
  }
};

//get all  auctions
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Item.find();
    res.status(201).json({ success: true, data: auctions });
  } catch (error) {
    res.status(409).json({ success: false, data: [], error: error.message });
  }
};

//get user from user ID
const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(409).json({ success: false, data: [], error: error.message });
  }
};

//get Auction from itemID
const getSingleAuction = async (req, res) => {
  try {
    const item = await Item.findOne({ id: req.params.id });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(409).json({ success: false, data: [], error: error.message });
  }
};

//get evvery auction put up by the user
const getMyauctions = async (req, res) => {
  Item.find({ userId: req.params.id }).then(
    (items) => {
      res.status(201).json({ success: true, items });
    },
    (error) => {
      res.status(409).json({ success: false, error: error.message });
    }
  );
};

//adds the bid to items.bids, updates current bids on item and updates users bids on items
const placeBid = (req, res) => {
  const Bid = {
    bid: req.params.bid,
    userId: req.params.userId,
  };
  Item.findOneAndUpdate(
    { id: req.params.id },
    { $push: { bids: { bid: req.body.bid, userId: req.body.userId } } },
    { new: true }
  ).then(
    () => {
      Item.findOne({ id: req.params.id }).then((doc) => {
        const currentbid = doc.bids.length - 1;
        Item.findOneAndUpdate(
          { id: req.params.id },
          { currentBids: currentbid },
          { new: true }
        ).then((item) => {
          User.findOneAndUpdate(
            { userId: req.body.userId },
            {
              $push: { userBids: { bid: req.body.bid, itemId: req.params.id } },
            },
            { new: true }
          ).then((response) => {
            res.status(201).json({ success: true });
          });
        });
      });
    },
    (error) => {
      res.status(409).json({ success: false, error: error.message });
    }
  );
};

const getWinner = async (req, res) => {
  const itemId = req.params.id;
  bids = [];
  const HighestBid = {};
  Item.findOne({ id: itemId }).then(
    (item) => {
      bids = item.bids;
      highestBid = bids.reduce((prev, current) => {
        return prev.bid > current.bid ? prev : current;
      });
      Item.findOneAndUpdate(
        { id: itemId },
        { bidWinner: highestBid.userId },
        { new: true }
      ).then(() => {
        res.status(201).json({ success: true, data: highestBid });
      });
    },
    (error) => {
      res.status(404).json({ success: false, error: error.message });
    }
  );
};

const updateUsersWonAuctions = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { userId: req.params.id },
      { $push: { wonAuctions: req.body.wonAuctions } },
      { new: true }
    ).then((result) => {
      res.status(201).json({ success: true});
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const verifyuser = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { userId: req.params.id },
      { userVerified: true },
      { new: true }
    ).then((result) => {
      res.status(201).json({ success: true});
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const getFeaturedItems = async (req, res) =>{
  try {
    const items = await Item.aggregate([{ $sample: { size: 4 } }]);
    res.status(201).json({ success: true, data: items });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
}

module.exports = {
  addNewItem,
  addImage,
  addNewUser,
  getAllAuctions,
  getUserData,
  getSingleAuction,
  getMyauctions,
  placeBid,
  getWinner,
  verifyuser,
  updateUsersWonAuctions,
  getFeaturedItems
};
