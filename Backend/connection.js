const mongoose = require("mongoose");

function connectMongoose(mongoURL) {
  return mongoose.connect(mongoURL);
}

module.exports = { connectMongoose };
