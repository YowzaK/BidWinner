const express = require("express");
const {
  addImage,
  addNewItem,
  addNewUser,
  getAllAuctions,
  getUserData,
  getSingleAuction,
  getMyauctions,
  placeBid,
  getWinner,
  updateUsersWonAuctions,
  verifyuser,
  getFeaturedItems
} = require("../Controllers/storageController.js");

router = express.Router();

router.post("/addImage/:itemID", addImage);
router.post("/newItem", addNewItem);
router.post("/newUser", addNewUser);
router.get("/getMyAuctions/:id", getMyauctions);
router.get("/getAuctions", getAllAuctions);
router.get("/getUserData/:userId", getUserData);
router.get("/getSingleAuction/:id", getSingleAuction);
router.post("/placeBid/:id",placeBid)
router.get("/ifAuctionWon/:id", getWinner)
router.post("/updateUserWon/:id", updateUsersWonAuctions);
router.get("/verifyuser/:id", verifyuser)
router.get("/featuredItems", getFeaturedItems)

module.exports = router;
