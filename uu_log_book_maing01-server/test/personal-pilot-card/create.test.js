const { TestHelper } = require("uu_appg01_server-test");
const CMD = "personalPilotCard/create";
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
      name: "name",
    };
    let result = await TestHelper.executePostCommand(CMD, dtoIn, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});
