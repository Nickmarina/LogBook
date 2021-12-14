"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogBookMongo extends UuObjectDao {
  async createSchema() {  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getByAwid(awid) {
    let filter = {
      awid
    };
    return await super.findOne(filter);
  }

  async updateByAwid(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  
}

module.exports = LogBookMongo;
