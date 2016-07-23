const getMongoDBURL = () => {
  const MONGODB_PORT = process.env.CUSTOM_MONGODB_PORT || 27017;

  return `mongodb://127.0.0.1:${MONGODB_PORT}/radiorevolt_test`;
};

module.exports = {
  MONGODB_URL: getMongoDBURL(),
};
