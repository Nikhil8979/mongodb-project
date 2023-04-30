const { HOST, PORT, MONGO_CONNECTION_URL } = process.env;
module.exports = {
  HOST,
  PORT,
  MONGO_CONNECTION_URL,
  CHECK_IN: "check-in",
  CHECK_OUT: "check-out",
};
