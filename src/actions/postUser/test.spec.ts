//@ts-ignore
import { postUser } from "./postUser.ts";
//@ts-ignore
import * as utils from "../../utils/utils.ts";

const post = jest.mock("../../dbApi/dbApi.ts", () => ({
  postNewUser: jest.fn(),
}));

let responseData = null;

jest
  .spyOn(utils, "sendResponse")
  .mockImplementation((...data) => (responseData = data));

describe("Testing the postUser action", () => {
  it("Should add a new user", async () => {
    const mockedData = {
      username: "Slava",
      age: "25",
      hobbies: [],
    };

    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(mockedData));
    await postUser();
    const [code, response] = responseData;

    expect(code).toEqual(201);
    expect(response).toHaveLength(1);
  });

  it("Should be failed when some required field is lost", async () => {
    const mockedData = { username: "Slava", age: 25 };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(mockedData));
    await postUser();
    const [code, response] = responseData;
    expect(code).toEqual(400);
    expect(response).toEqual('Invalid input data. All required fields should be filled in');
  });
});
