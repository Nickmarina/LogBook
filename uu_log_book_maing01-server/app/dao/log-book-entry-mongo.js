"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogBookEntry extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
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

  //  listByRegNum (awid, RegNum, sortBy, order, pageInfo) -> {itemList:[uuObject], pageInfo:{}}
  // listByRegNumAndUuIdentity (awid, uuIdentity, RegNum, sortBy, order, pageInfo) -> {itemList:[uuObject], pageInfo:{}}
  // listByUuIdentity (awid, uuIdentity, sortBy, order, pageInfo) -> {itemList:[uuObject], pageInfo:{}}
}

module.exports = LogBookEntry;
