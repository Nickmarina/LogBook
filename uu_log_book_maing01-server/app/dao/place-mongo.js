"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PlaceMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, codeOfPlace: 1 });
    await super.createIndex({ awid: 1, id: 1 });
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
  
  async getByCode(awid, codeOfPlace) {
    let filter = {
      awid,
      codeOfPlace
    };
    return await super.findOne(filter);
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.deleteOne(filter);
  }

  async deleteByCodeOfPlace(awid, codeOfPlace) {
    let filter = {
      awid,
      codeOfPlace,
    };
    return await super.deleteOne(filter);
  }

  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }
}

module.exports = PlaceMongo;
