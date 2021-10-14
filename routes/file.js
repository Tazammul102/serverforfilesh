const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const authenticate = require("../middleware/authenticate");
const Files = require("../models/Files");
const { v4: uuidv4 } = require("uuid");
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
);

router.post("/", authenticate, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new Files({
      user: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({
      file: `http://localhost:${process.env.PORT}/files/${response.uuid}`,
    });
  });
});
router.get("/getuserfile", authenticate, async (req, res) => {
  try {
    const files = await Files.find({ user: req.user.id });
    res.json(files);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:uuid", async (req, res) => {
  // Extract link and get file from storage send download stream
  const file = await Files.findOne({ uuid: req.params.uuid });
  // Link expired
  if (!file) {
    return res.json({ error: "Link has been expired." });
  }
  const response = await file.save();
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
});
module.exports = router;
