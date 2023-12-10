const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const user = req.user;
  user.comparePassword(req.body.oldPassword, async (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      const { newPassword } = req.body.newPassword;
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(401).json({ message: "Password does not match" });
    }
  });
};

const deleteUser = async (req, res) => {
  const user = req.user;
  await user.remove();
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = { changePassword, deleteUser };
