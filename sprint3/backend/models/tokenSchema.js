///////////// OUTDATED, DON'T USE THIS FILE ///////////////

require("dotenv").config();

const { createClient } = require("redis");

const client = createClient({
  password: "Riunv49iPjdRzPkXCDYbtndhQgL9EyMF",
  socket: {
    host: "redis-11427.c311.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 11427,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

async function myAsyncFunction() {
  try {
    await client.connect();

    await client.set("key", "value");
    const value = await client.get("key");

    await client.hSet("user-session:123", {
      name: "John",
      surname: "Smith",
      company: "Redis",
      age: 29,
    });

    let userSession = await client.hGetAll("user-session:123");
    console.log(JSON.stringify(userSession, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.disconnect();
  }
}

myAsyncFunction();
