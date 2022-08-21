const User = require("../model/User");

//to post user

exports.postuserdetails = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name) {
      return res.status(422).json({ error: "Please add name.." });
    }
    if (!email) {
      return res.status(422).json({ error: "Please add email.." });
    }

    if (!age) {
      return res.status(422).json({ error: "Please add age.." });
    }

    const userinfo = new User({
      name,
      email,
      age,
    });

    const userResult = await User.create(userinfo);

    res.status(201).json(userResult);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong, Can't Create User" });
  }
};

//to get user list

exports.getAllUserList = async (req, res) => {
  try {
    const userlist = await User.find({}).sort({ date: "DESC" });

    // res.json(userlist);

    res.status(200).json(userlist);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong.." });
  }
};

//to update

exports.updateUserInfo = async (req, res) => {
  try {
    var updateQuery = { _id: req.params.id };

    const { name, email, age } = req.body;

    const payload = { name, email, age };

    const userupdateinfo = await User.findByIdAndUpdate(updateQuery, {
      $set: payload,
    });

    res.status(200).json(userupdateinfo);
  } catch (error) {
    res.status(404).json({ error: "User could not found to update.." });
  }
};

//to get single user

exports.singleUser = async (req, res) => {
  try {
    var singleusequery = { _id: req.params.id };

    const singleUser = await User.findOne(singleusequery);

    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

//to delete

exports.deleteUser = async (req, res) => {
  try {
    var userid = { _id: req.params.id };

    const result = await User.findByIdAndDelete(userid);

    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error: "User could not found" });
  }
};
