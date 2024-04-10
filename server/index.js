const express = require("express");
const session  = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./src/config");
const router = require("./src/routes");

const app = express();

app.use(express.urlencoded({extended : true }))

app.use(cors());
app.use(bodyParser.json());
connectToDatabase();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



app.use("/api", router);

app.get('/',(req,res)=>{
  req.session.isAuth = true
  res.json(session)
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
