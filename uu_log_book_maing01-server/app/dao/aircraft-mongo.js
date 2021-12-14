"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AircraftMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1,  regNum:1 } , { unique: true });
    await super.createIndex({ awid: 1,  id:1 } , { unique: true });
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

  async list(awid, sortBy, order, pageInfo){
    return await super.find({awid}, pageInfo);
 }

 async getByRegNum (awid, regNum) {
     let filter={
         awid,
         regNum
     }
    return await super.findOne(filter)
 }
 
}

module.exports = AircraftMongo;
