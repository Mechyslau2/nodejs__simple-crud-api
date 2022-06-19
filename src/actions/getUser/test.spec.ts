//@ts-ignore
import { getUser } from "./getUser.ts";
//@ts-ignore
import * as utils from "../../utils/utils.ts";

const mockedDB = [{
    id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
    username: "Slava",
    age: "25",
    hobbies: [],
  }];

jest.mock("../../dbApi/dbApi.ts", () => ({
  getUserById: jest.fn((id) => mockedDB.find(item => item.id === id)),
}));

let responseData = null;

jest
  .spyOn(utils, "sendResponse")
  .mockImplementation((...data) => (responseData = data));

describe("Testing the getUser action", () => {
  it("Should get the user", async () => {
    const data = { id: "c91f111f-0eb6-4bd0-99be-6671431596b3" };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await getUser();
    const [code, response] = responseData;
    expect(code).toEqual(200);
    expect(response.message).toEqual("successfully found");
    expect(response.response.username).toEqual("Slava");
    expect(response.response.age).toEqual("25");
  });

  it("Should be failed when user doesn't exist", async () => {
    const data = { id: '99c80c9b-4066-4589-81d2-63b5a12ef38b' };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await getUser();
    const [code] = responseData;

    expect(code).toEqual(404);
  });

  it("Should be failed when passed incorrect id format", async () => {
    const data = { id: "1" };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await getUser();
    const [code, response] = responseData;
    expect(code).toEqual(400);
    expect(response).toEqual("Invalid id format");
  });
});
