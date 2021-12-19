"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogBookEntry extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ id: 1 });
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

  async update(uuObject) {
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
    if (sortBy === "departureDate") {
      order === "asc" ? (sort = { departureDate: 1 }) : (sort = { departureDate: -1 });
    } else {
      order === "asc" ? (sort = { regNum: 1 }) : (sort = { regNum: -1 });
    }
    return await super.find({ awid }, pageInfo, sort);
  }

  async listByRegNum(awid, regNum, sortBy, order, pageInfo) {
    let sort = null;
    if (sortBy === "departureDate") {
      order === "asc" ? (sort = { departureDate: 1 }) : (sort = { departureDate: -1 });
    } else {
      order === "asc" ? (sort = { regNum: 1 }) : (sort = { regNum: -1 });
    }
    const filter = {
      awid,
      regNum,
    };
    return await super.find(filter, pageInfo, sort);
  }

  async listByRegNumAndUuIdentity(awid, uuIdentity, RegNum, sortBy, order, pageInfo) {
    let sort = null;
    if (sortBy === "departureDate") {
      order === "asc" ? (sort = { departureDate: 1 }) : (sort = { departureDate: -1 });
    } else {
      order === "asc" ? (sort = { regNum: 1 }) : (sort = { regNum: -1 });
    }
    const filter = {
      awid,
      uuIdentity,
      RegNum,
    };
    return await super.find(filter, pageInfo, sort);
  }

  async listByUuIdentity(awid, uuIdentity, sortBy, order, pageInfo) {
    let sort = null;
    if (sortBy === "departureDate") {
      order === "asc" ? (sort = { departureDate: 1 }) : (sort = { departureDate: -1 });
    } else {
      order === "asc" ? (sort = { regNum: 1 }) : (sort = { regNum: -1 });
    }
    const filter = { awid, coPilotIdentity: uuIdentity };
    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = LogBookEntry;
