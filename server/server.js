require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/connection");
const PORT = process.env.PORT || 5000;
const { cloudinary } = require("./utils/cloudinary");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder: react_demo")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map(file => file.public_id);

  res.send(publicIds);
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "guu5ztwg"
    });
    console.log(uploadResponse); // url to save to MongoDB: uploadResponse.secure_url
    res.json({ message: "File uploaded to cloudinary" });
  } catch (error) {
    console.log(error);
  }
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listning at port: " + PORT);
  });
});
