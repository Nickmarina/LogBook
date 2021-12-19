const { TestHelper } = require("uu_appg01_server-test");
const CMD = "logBookEntry/list";
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
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let dtoIn = {
      departureDate: "2021-12-18",
      arrivalDate: "2021-12-19",
      departurePlace: "KBP",
      arrivalPlace: "KBP",
      regNum: "OT-HUP",
    };
    await TestHelper.executePostCommand("logBookEntry/create", dtoIn, session);
    const result = await TestHelper.executeGetCommand(CMD, {}, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});