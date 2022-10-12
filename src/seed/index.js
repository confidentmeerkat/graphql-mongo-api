const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const Vehicle = require("../models/Vehicle");
const VehicleType = require("../models/VehicleType");

const parser = new XMLParser();

let idsForType = {};

async function seed() {
  await Vehicle.collection.drop();
  await VehicleType.collection.drop();

  const { data } = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML"
  );

  const {
    Response: {
      Results: { AllVehicleMakes },
    },
  } = parser.parse(data);
  // console.log('AllVehicleMakes :', AllVehicleMakes);

  for (let i of AllVehicleMakes) {
    const { Make_ID, Make_Name } = i;
    console.log("Make_ID :", Make_ID);

    const { data: typeData } = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${Make_ID}?format=%20x%20ml`
    );
    const {
      Response: {
        Results: { VehicleTypesForMakeIds },
      },
    } = parser.parse(typeData);
    // console.log("VehicleTypesForMakeIds :", VehicleTypesForMakeIds);

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

    const vehicle = await Vehicle.create({
      makeId: Make_ID,
      makeName: Make_Name,
      vehicleTypes,
    });

    console.log(vehicle);
  }
}

seed();
