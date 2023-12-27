const users = [
  {
    name: "John Doe",
    password: "password123",
    email: "john.doe@example.com",
    token: "mytoken123",
    role: "admin",
  },
  {
    name: "Jane Smith",
    password: "password456",
    email: "jane.smith@example.com",
    token: "mytoken456",
    role: "user",
  },
  {
    name: "Bob Johnson",
    password: "password789",
    email: "bob.johnson@example.com",
    token: "mytoken789",
    role: "user",
  },
];

const forgotPassword = (email) => {
  const user = users.find((user) => user.email === email);
  return user;
};

const login = (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  console.log('USER: ', user);
  return user;
};



module.exports = { forgotPassword, login };
