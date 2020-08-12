const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/GeneralStoreDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "Enter user name"] },
  password: { type: String, required: [true, "Enter password"] },
});

const User = mongoose.model("User", userSchema);

const vendorSchema = new mongoose.Schema({
  mobile: { type: Number, required: [true, "Enter mobile number"] },
  password: { type: String, required: [true, "Enter password"] },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

const itemSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Enter item title"]} ,
    description: String,
    price: { type: Number, required: [true, "Enter price"] }
  });

const Item = mongoose.model("Item", itemSchema);

app.post("/user/login", function (req, res) {
  const userName = req.body.userName;
  const password = md5(req.body.password);

  User.findOne({ userName: userName }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          console.log(res.statusCode);
          console.log("Logged in Successfully");
        } else {
          console.log(res.statusCode);
          console.log("Incorrect password");
        }
      } else {
        console.log(res.statusCode);
        console.log("Invalid credentials");
      }
    }
  });
});

app.post("/vendor/login", function (req, res) {
  const mobile = req.body.mobile;
  const password = md5(req.body.password);

  Vendor.findOne({ mobile: mobile }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          console.log(res.statusCode);
          console.log("Logged in Successfully");
        } else {
          console.log(res.statusCode);
          console.log("Incorrect password");
        }
      } else {
        console.log(res.statusCode);
        console.log("Invalid credentials");
      }
    }
  });
});

app.post("/user/registration", function (req, res) {
  const userName = req.body.userName;
  const password = md5(req.body.password);

  const newUser = new User({
    userName: userName,
    password: password,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(res.statusCode);
      console.log("User registered successfully");
    }
  });
});

app.post("/vendor/registration", function (req, res) {
  const mobile = req.body.mobile;
  const password = md5(req.body.password);

  const newVendor = new Vendor({
    mobile: mobile,
    password: password,
  });
  newVendor.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(res.statusCode);
      console.log("Vendor registered successfully ");
    }
  });
});

app.get("/vendor/list", function (req, res) {
  Item.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      console.log(res.statusCode);
      console.log("Success");
      console.log("Items: ");
      console.log(items);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
