const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

require("./model/db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api",require("./router/user"));
// app.use("/api",require("./router/category"));

// to deploy to heroku

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   const path = require("path");

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }


// to deploy to vercel


if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}




app.listen(port, (req, res) => {
  console.log("Server connected");
});
