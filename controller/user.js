
const AWS = require("aws-sdk");
const User = require("../model/User");


require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true
  
};

const SES = new AWS.SES(awsConfig);

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


    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [process.env.EMAIL_FROM],
      },
      ReplyToAddresses: [email],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
                <h1 style={{color:"red"}}>Message from Typescript App</h1>
                <p>Visit the website</p>
              </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Welcome Your Name is: "+name,
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    

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
