require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/connection");
const PORT = process.env.PORT || 5000;
const upload = require("./utils/multer");
const cloud = require("./utils/cloudinary");
const fs = require("node:fs");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use("/upload-images", upload.array("image"), async (req, res) => {
  const uploader = async path => await cloud.uploads(path, "Images");
  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: "Images uploades successfully",
      data: urls
    });
  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listning at port: " + PORT);
  });
});
