const Vehicle = require("../../models/Vehicle");

const Query = {
  vehicles: () => {
    return Vehicle.find().populate("vehicleTypes").exec();
  },
  vehicle: (_, args) => {
    return Vehicle.findOne({ makeId: args.makeId })
      .populate("vehicleTypes")
      .exec();
  },
};

module.exports = { Query };
