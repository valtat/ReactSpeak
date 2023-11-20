const users = [
  {
    name: "John Doe",
    password: "password123",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    password: "password456",
    email: "jane.smith@example.com",
  },
  {
    name: "Bob Johnson",
    password: "password789",
    email: "bob.johnson@example.com",
  },
];

const forgotPassword = (email) => {
  const user = users.find((user) => user.email === email);
  return user;
};

module.exports = { forgotPassword };
