//@ts-ignore
import { getUserErrorOnCreate } from "../../errors/error.ts";
//@ts-ignore
import { parseData, isNotValid, createUser, sendResponse } from "../../utils/utils.ts";
//@ts-ignore
import * as dbAPI from '../../dbAPI/dbAPI.ts';
//@ts-ignore
import { Callback } from "../../actions/actionsTypes.ts";

export const postUser: Callback = async (req, res) => {
    try {
      const data = await parseData(req);
      const parsedData = JSON.parse(data);
      if (isNotValid(parsedData)) {
        throw new Error("400");
      }
      const user = createUser(parsedData);
      const response = await dbAPI.postNewUser(user);
      sendResponse(201, response, res);
    } catch ({ message }) {
      if (Number(message)) {
        const errorMessage = getUserErrorOnCreate(message);
        sendResponse(Number(message), errorMessage, res);
      } else {
        sendResponse(404, "Invalid data", res);
      }
    }
  };
