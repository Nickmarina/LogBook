const { TestHelper } = require("uu_appg01_server-test");
const CMD = "logBookEntry/create";
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
      arrivalPlace: "LWO",
      regNum: "OT-HUP",
      coPilotIdentity: "61bc8752acaa882ed4acfdca"
    };
    let result = await TestHelper.executePostCommand(CMD, dtoIn, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });

  test("logBookDoesNotExist", async () => {
    let session = await TestHelper.login("Authorities", false, false);
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ awid: `test` })}}`;
    await TestHelper.executeDbScript(`db.logBook.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/logBookDoesNotExist`,
      message: "LogBook does not exist.",
      paramMap: { awid: TestHelper.awid },
    };
    expect.assertions(3);
    try {
      const list = await TestHelper.executePostCommand("logBookEntry/create", { name: "name" }, session);
      await TestHelper.executeGeCtommand("logBookEntry/get", { id: list.id }, session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);

      if (error.paramMap && expectedError.paramMap) {
        expect(error.paramMap).toEqual(expectedError.paramMap);
      }
    }
  });
});
