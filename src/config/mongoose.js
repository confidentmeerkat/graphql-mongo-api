const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DBHOST + "/" + process.env.DATABASE);

module.exports = mongoose;
