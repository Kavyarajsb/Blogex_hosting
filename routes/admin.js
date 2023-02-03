const adminModel = require("../models/admin-and-users");
const express = require("express");
const { default: mongoose } = require("mongoose");
const { json } = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const Category = require("../models/category");
const post = require("../models/posts");
const jwt = require("jsonwebtoken");
try {
  route.post("/api/login", (req, res) => {
    console.log("inside the login route", req.body);

    adminModel.findOne(
      { email: req.body.email, isAdmin: true },
      (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
          // res.send(err);
        } else if(data){
          console.log("user email  is matching");
          console.log("data", data);
          if(req.body.password === data.password){
            let payload = { subject: data.email + data.password };
                let token = jwt.sign(payload, "secretKey");
                res.json({
                  message: "password matching",
                  status: "success",
                  id: data._id,
                  tok: token,
                });
    
          }
          else{
              res.send({message:"invalid password"})
          }
        }
        else{
          res.send({message:"email not matching"})
        }
      });
    });
} catch (err) {
  console.log(err);
}

try {
  route.get("/api/landing", (req, res) => {
    CategoryAndPost.find().then((data) => {
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.post("/api/addCategory", async (req, res) => {
    console.log("body in addcategory route", req.body);
    let datas = {
      categoryTitle: req.body.categoryTitle,
      description: req.body.description,
    };
    let data = new Category(datas);
    data.save().then(console.log("saved successfully"));
    res.send({ message: "new user data saving,,," });
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/api/viewCategories", (req, res) => {
    Category.find().then((data) => {
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.post("/api/addPost/:categoryTitle", async (req, res) => {
    // console.log("category title is ",category)
    console.log("body in add post route", req.body);
    let datas = {
      // email:req.body.email,
      category: req.params.categoryTitle,
      heading: req.body.heading,
      description: req.body.description,
      email:req.body.email
    };
    let data = new post(datas);
    data.save().then(()=>{console.log("post is saved")
  res.send({message:"post created"})});
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/api/viewPostsInCategory/:categoryTitle", (req, res) => {
    let category = req.params.categoryTitle;

    post.find({ category: category }, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (data) {
        console.log(data);
        res.json(data);
      }
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.delete("/api/deleteCategory/:categoryName", function (req, res) {
    const category = req.params.categoryName;
    //console.log(id);
    Category.findOneAndDelete({ categoryTitle: category }).then(() => {
      console.log("delete success");
      res.send({ message: "delete success" });
    });
  });
} catch (err) {
  console.log(err);
}
// deleteCategory

try {
  route.delete("/api/deletePost/:id", function (req, res) {
    const id = req.params.id;
    console.log("id is", id);
    post.findByIdAndDelete({ _id: id }).then(() => {
      console.log("delete success");
      res.send({message:"delete success"});
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.put("/api/updateCategory", (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let id = req.body._id;
    Category.findByIdAndUpdate(
      { _id: id },
      { $set: { categoryTitle: title, description: description } }
    ).then(console.log("updated"));
  });
} catch (err) {
  console.log(err);
}

try {
  route.put("/api/updatePost", (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let id = req.body._id;
    post
      .findByIdAndUpdate(
        { _id: id },
        { $set: { heading: title, description: description } }
      )
      .then(()=>{
        console.log("updated");
        res.send({message:"updated successfully"})
      });
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/api/viewLatestPost", (req, res) => {
    post
      .find()
      .sort({ time: -1 })
      .limit(4)
      .then((data) => {
        res.send(data);
      });
  });
} catch (err) {
  console.log(err);
}
try {
  route.get("/api/viewApost/:postid", (req, res) => {
    let id = req.params.postid;
    console.log(id);
    post.findOne({ _id: id }).then((data) => {
      console.log(data);
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = route;
