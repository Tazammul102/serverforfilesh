const router = require("express").Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const sendEmail = require("../controller/email/sendEmail");
const jwt = require("jsonwebtoken");

// router.post("/register", require("../controller/authentication/register"));
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(401).json({ error: "Please Fill All Details Correctly" });
  }
  const userExist = await Users.findOne({ email });
  // console.log(userExist);
  if (userExist) {
    return res.json({ error: "Email Already Exist" });
  } else {
    let isVarified = false;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const user = new Users({ name, email, password: secPass, isVarified });
    user.save();
    sendEmail(`http://localhost:5000/api/auth/verify/${user.id}`, email);
    res.send(user);
  }
});

// router.post("/login", require("../controller/authentication/login"));
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ error: "Please Fill All Details Correctly" });
    }
    const user = await Users.findOne({ email });
    // console.log(userExist);
    if (!user) {
      return res.json({ error: "Please fill Correct Details" });
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json({ error: "Please fill Correct Details" });
      }
      if (user.isVarified === false) {
        return res.json({ error: "Please Verify Your Email" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECT);
      success = true;
      res.cookie("authtoken", authtoken).json({ success, authtoken });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

  // sendEmail("https://google.com", "tazammulansari68@gmail.com");
});
router.get("/verify/:id", async (req, res) => {
  try {
    let user = await Users.findByIdAndUpdate(req.params.id, {
      isVarified: true,
    });
    res.redirect("/");
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
