//@ts-ignore
import { deleteUser } from "./deleteUser.ts";
//@ts-ignore
import * as utils from "../../utils/utils.ts";

let mockedDB = [
  {
    id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
    username: "Slava",
    age: "25",
    hobbies: [],
  },
  {
    id: "99c80c9b-4066-4589-81d2-63b5a12ef38b",
    username: "Vova",
    age: "26",
    hobbies: [],
  },
];

jest.mock("../../dbApi/dbApi.ts", () => ({
  deleteUser: jest.fn((id) => {
    const user = mockedDB.find(item => item.id === id);
    mockedDB = mockedDB.filter(item => item.id !== id);
    return user ? [...mockedDB] : null;
  }),
}));

let responseData = null;

jest
  .spyOn(utils, "sendResponse")
  .mockImplementation((...data) => (responseData = data));

describe("Testing the deleteUser action", () => {
  it("Should delete the user by id", async () => {
    const data = {
      id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
    };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await deleteUser();
    const [code] = responseData;
    expect(code).toEqual(204);
  });

  it("Should be failed when user have been deleted", async () => {
    const data = {
      id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
    };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await deleteUser();
    const [code, response] = responseData;

    expect(code).toEqual(404);
    expect(response).toEqual("User not found");
  });

  it("Should be failed when passed incorrect id format", async () => {
    const data = { id: "1" };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await deleteUser();
    const [code, response] = responseData;
    expect(code).toEqual(400);
    expect(response).toEqual("Invalid id format");
  });
});
