const Users = require("../../models/Users");
module.exports = (req, res) => {
  const { name, email, password, isVarified } = req.body;
  const user = new Users({ name, email, password, isVarified });
  user.save();
  res.send(user);
};
