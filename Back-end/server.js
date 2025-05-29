require("dotenv/config");
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const cors = require("cors");
const fileUpload = require("express-fileupload");

PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use("/BidWinner", routes);




async function dbCon (){
  await mongoose.connect(
    process.env.DB_CONNECTION,
    {
      dbName:'Bidwinner',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  ).then(
    res => {
      if(res){
        console.log('db connected');
      }else {
        console.log('db cannot be connected');
      }
    } 
  )
}

dbCon()

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
