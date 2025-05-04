const mongoose = require("mongoose");

function connectMongoose(mongoURL) {
  return mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connectMongoose };
