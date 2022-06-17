import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuid, version, validate } from "uuid";

export const parseData = async (req: IncomingMessage): Promise<string> =>
  new Promise((res, rej) => {
    let str = "";
    req.on("data", (data) => {
      str += res(Buffer.from(data).toString());
    });

    req.on("end", () => {
      if (str) {
        res(str);
      } else {
        rej("error");
      }
    });

    req.on("error", () => rej("error"));
  });

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: String[] | [];
}

export const createUser = (user): IUser => ({
  id: uuid(),
  username: user.username,
  age: user.age,
  hobbies: user.hobbies,
});

type Data = IUser[] | string;

export const sendResponse = (
  code: number,
  responseData: Data,
  res: ServerResponse
): void => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(responseData));
};

export const isNotValid = (userData): boolean =>
  !(userData && userData?.username && userData?.age && userData?.hobbies);

export const isNotValidIdFormat = (id: string): boolean =>
  !(validate(id) && version(id) === 4);
