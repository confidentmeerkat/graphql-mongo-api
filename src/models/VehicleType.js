const { Schema, model, Types } = require("../config/mongoose");

const typeSchema = new Schema({
  typeId: {
    type: Number,
    required: true,
    unique: true,
  },
  typeName: {
    type: String,
    required: true,
  },
});

const VehicleType = model("VehicleType", typeSchema);

module.exports = VehicleType;
