const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const Vehicle = require("../models/Vehicle");
const VehicleType = require("../models/VehicleType");


async function seed() {
  const parser = new XMLParser();
  const vehicles = await Vehicle.find({}).select("makeId");
  let isVehicleExist = {};
  let idsForType = {};
  for (let i of vehicles) {
    isVehicleExist[i.makeId] = true;
  }

  const vehicleTypes = await VehicleType.find({}).select("typeId");
  for (let i of vehicleTypes) {
    idsForType[i.typeId] = i._id;
  }

  const { data } = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML"
  );

  const {
    Response: {
      Results: { AllVehicleMakes },
    },
  } = parser.parse(data);

  for (let i of AllVehicleMakes) {
    if (isVehicleExist[i.Make_ID]) continue;

    const { Make_ID, Make_Name } = i;

    const { data: typeData } = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${Make_ID}?format=%20x%20ml`
    );
    const {
      Response: {
        Results: { VehicleTypesForMakeIds },
      },
    } = parser.parse(typeData);

    let vehicleTypes = [];

    if (VehicleTypesForMakeIds) {
      for (let { VehicleTypeId, VehicleTypeName } of Array.isArray(
        VehicleTypesForMakeIds
      )
        ? VehicleTypesForMakeIds
        : [VehicleTypesForMakeIds]) {
        if (!idsForType[VehicleTypeId]) {
          const type = await VehicleType.create({
            typeId: VehicleTypeId,
            typeName: VehicleTypeName,
          });

          idsForType[VehicleTypeId] = type._id.toString();
        }

        vehicleTypes.push(idsForType[VehicleTypeId]);
      }
    }

    Vehicle.create({
      makeId: Make_ID,
      makeName: Make_Name,
      vehicleTypes,
    }).then((v) => console.log(v));
  }
}

module.exports = seed;
