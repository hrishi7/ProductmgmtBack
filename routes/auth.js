const router = require("express").Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  /**validation */
  if (!email || !password) {
    return res.status(401).json({ message: "Email/ Password can't be empty" });
  }

  const user = await User.findOne({
    email: req.body.email,
    password,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid Credientials" });
  }
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  }; // Create JWT Payload
  // Sign Token
  jwt.sign(
    payload,
    process.env.SECRETORKEY,
    { expiresIn: 3600 },
    (err, token) => {
      res.status(200).json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
});

module.exports = router;
