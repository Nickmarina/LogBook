const { TestHelper } = require("uu_appg01_server-test");
const CMD = "place/get";
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
      codeOfPlace: "TNL",
      cityOfPlace: "Ternopil",
      coordinates: "40.812500,23.956100",
    };
    let place = await TestHelper.executePostCommand("place/create", dtoIn, session);
    const result = await TestHelper.executeGetCommand(CMD, { id: place.id }, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});
