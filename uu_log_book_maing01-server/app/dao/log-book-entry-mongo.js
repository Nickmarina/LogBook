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
    return await super.find({ awid }, pageInfo);
  }

  async listByRegNum(awid, RegNum, sortBy, order, pageInfo) {
    const filter = {
      awid,
      RegNum,
    };
    return await super.find(filter, pageInfo);
  }

  async listByRegNumAndUuIdentity(awid, uuIdentity, RegNum, sortBy, order, pageInfo) {
    const filter = {
      awid,
      uuIdentity,
      RegNum,
      order,
    };
    return await super.find(filter, pageInfo);
  }

  async listByUuIdentity(awid, uuIdentity, sortBy, order, pageInfo) {
    const filter = {
      awid,
      uuIdentity,
      order,
    };
    return await super.find(filter, pageInfo);
  }
}

module.exports = LogBookEntry;
