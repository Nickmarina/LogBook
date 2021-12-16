"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AircraftMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ regNum: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async setState(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.deleteOne(filter);
  }

  async list(awid, sortBy, order, pageInfo) {
    let sort = null;
    order === "asc" && sortBy === "regNum" ? (sort = { regNum: 1 }) : (sort = { regNum: -1 });

    return await super.find({ awid }, pageInfo, sort);
  }

  async getByRegNum(awid, regNum) {
    let filter = {
      awid,
      regNum,
    };
    return await super.findOne(filter);
  }
}

module.exports = AircraftMongo;
