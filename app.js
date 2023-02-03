const express = require("express");
const app = express();
const cors = require("cors");

const path = require ('path');
app.use(express.static('./dist/frontend'));

// const Manageadmin = require("./routes/manage-admin");
const user = require("./routes/user");
const admin = require("./routes/admin");
const superadmin = require("./routes/superadmin");
require("./Middlewares/mongodb");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// app.use("/superadmin", Manageadmin);
app.use("/user", user);
app.use("/admin",admin)
app.use("/superadmin",superadmin)

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname +'/dist/frontend/index.html'));
});

// Server
app.listen(3000, () => {
  console.log("Server running at 3000");
});
