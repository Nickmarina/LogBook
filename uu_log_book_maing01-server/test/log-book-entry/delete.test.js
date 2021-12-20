const { TestHelper } = require("uu_appg01_server-test");
const CMD = "logBookEntry/delete";
afterEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U", code: "123test", name: "123test" });
});

describe(`Testing the ${CMD}...`, () => {
  test("HDS by id", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let dtoIn = {
      departureDate: "2021-12-18",
      arrivalDate: "2021-12-19",
      departurePlace: "KBP",
      arrivalPlace: "LWO",
      regNum: "OT-HUP",
      coPilotIdentity: "61bc8752acaa882ed4acfdca"
    };
    let entry = await TestHelper.executePostCommand("logBookEntry/create", dtoIn, session);
    const result = await TestHelper.executePostCommand(CMD, { id: entry.id }, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});
