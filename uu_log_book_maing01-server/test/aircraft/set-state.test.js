const { TestHelper } = require("uu_appg01_server-test");
const CMD = "aircraft/setState";
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
      regNum: "kk-jjj",
      model: "model",
    };
    let aircraft = await TestHelper.executePostCommand("aircraft/create", dtoIn, session);
    const result = await TestHelper.executePostCommand(CMD, { id: aircraft.id, state: "closed" }, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});
