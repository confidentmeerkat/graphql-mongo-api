const Vehicle = require("../../models/Vehicle");

const Query = {
  vehicles: (_, args) => {
    const { dateAfter, dateBefore } = args;
    let condition = {};
    if(dateAfter || dateBefore) condition.createdAt = {}
    if (dateAfter) {condition.createdAt.$gte = new Date(dateAfter)};
    if (dateBefore) condition.createdAt.$lte = new Date(dateBefore);

    return Vehicle.find(condition).populate("vehicleTypes").exec();
  },
  vehicle: (_, args) => {
    return Vehicle.findOne({ makeId: args.makeId })
      .populate("vehicleTypes")
      .exec();
  },
};

module.exports = { Query };
