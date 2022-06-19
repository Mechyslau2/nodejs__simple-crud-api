//@ts-ignore
import { updateUser } from "./updateUser.ts";
//@ts-ignore
import * as utils from "../../utils/utils.ts";

const mockedDB = [
  {
    id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
    username: "Slava",
    age: "25",
    hobbies: [],
  },
];

jest.mock("../../dbApi/dbApi.ts", () => ({
  updateUser: jest.fn((data) => {
    if (mockedDB[0].id === data.id) {
      return (mockedDB[0] = { ...mockedDB[0], ...data });
    } return null;
  }),
}));

let responseData = null;

jest
  .spyOn(utils, "sendResponse")
  .mockImplementation((...data) => (responseData = data));

describe("Testing the updateUser action", () => {
  it("Should update the user data", async () => {
    const data = {
      id: "c91f111f-0eb6-4bd0-99be-6671431596b3",
      username: "Vasia",
    };
    jest
      .spyOn(utils, "parseData")
      .mockImplementation(() => JSON.stringify(data));
    await updateUser();
    const [code, response] = responseData;
    expect(code).toEqual(200);
    expect(response.message).toEqual("successfully updated");
    expect(response.response.username).toEqual("Vasia");
    expect(response.response.age).toEqual("25");
  });

    it("Should be failed when user doesn't exist", async () => {
      const data = { id: '99c80c9b-4066-4589-81d2-63b5a12ef38b' };
      jest
        .spyOn(utils, "parseData")
        .mockImplementation(() => JSON.stringify(data));
      await updateUser();
      const [code] = responseData;

      expect(code).toEqual(404);
    });

    it("Should be failed when passed incorrect id format", async () => {
      const data = { id: "1" };
      jest
        .spyOn(utils, "parseData")
        .mockImplementation(() => JSON.stringify(data));
      await updateUser();
      const [code, response] = responseData;
      expect(code).toEqual(400);
      expect(response).toEqual("Invalid id format");
    });
});
