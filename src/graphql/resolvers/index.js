const Vehicle = require("../../models/Vehicle");

const Query = {
  vehicles: () => {
    return Vehicle.find().populate("vehicleTypes").exec();
  },
};

module.exports = { Query };
