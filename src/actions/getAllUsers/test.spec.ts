//@ts-ignore
import { getAllUsers } from "./getAllUsers.ts";

const mockedDB = [
  {
    username: "Vasya",
    age: "20",
    hobbies: [],
  },
  {
    username: "Ania",
    age: "21",
    hobbies: [],
  },
];

jest.mock("../../dbApi/dbApi.ts", () => ({
  getUsers: jest.fn(() => mockedDB),
}));

let responseData = null;

jest.mock("../../utils/utils.ts", () => ({
  sendResponse: jest.fn((...data) => (responseData = data)),
}));

describe("Testing the getAllUsers action", () => {
  it("Should return all users", async () => {
    await getAllUsers();
    const [code, response] = responseData;
    expect(code).toEqual(200);
    expect(response).toHaveLength(2);
  });
});
