"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PersonalPilotCardMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, uuIdentity: 1 })
    await super.createIndex({ awid: 1, id: 1 })
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

  async getByUuIdentity(awid, uuIdentity) {
    let filter = {
      awid,
      uuIdentity,
    };
    return await super.findOne(filter);
  }

  async deleteByUuIdentity(awid, uuIdentity) {
    let filter = {
      awid,
      uuIdentity,
    };
    return await super.deleteOne(filter);
  }
}


module.exports = PersonalPilotCardMongo;
