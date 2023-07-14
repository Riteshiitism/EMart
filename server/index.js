const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
const Product = require("./models/productModel");
const {Customer} = require("./models/customerModel");

// set up routes
app.get('/',(req,res)=>{
  res.send(`Hello to Backend of the API`);
})

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

app.use('/product',require("./routers/productRouter"));


app.use("/tags",require('./routers/tagsRouter.js'));
app.use("/wishlist",require('./routers/wishlistRouter.js'))

const PORT = process.env.PORT || 5000;
// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("database connection is successful");
}).catch((err)=>{
    console.log("database connection failed with err " + err);
});
// mongoose.connect(
//   process.env.MDB_CONNECT,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) return console.error(err);
//     console.log("Connected to MongoDB");
//   }
// );


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



// app.get('/search/:key', async (req, res) => {
//    let result = await Product.find({
//     "$or" : [
//       {
//         name : { $regex : req.params.key}
//       }
//     ]
//    });
   
//    res.send(result);
// });

// Ecart
// 6jzyu7NVRqjdhUcm

