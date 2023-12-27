const server = require("./app");
const config = require("./utils/config");

const port = config.PORT || 3000;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
