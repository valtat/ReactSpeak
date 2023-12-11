const forgotPassword = (email) => {
  const user = users.find((user) => user.email === email);
  return user;
};

module.exports = { forgotPassword };
