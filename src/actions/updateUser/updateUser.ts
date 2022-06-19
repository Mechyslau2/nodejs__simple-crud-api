//@ts-ignore
import { Callback } from "./actions/actionsTypes.ts";
//@ts-ignore
import * as dbAPI from "../../dbAPI/dbAPI.ts";
//@ts-ignore
import { getUserError } from "../../errors/error.ts";
//@ts-ignore
import { parseData, sendResponse, isNotValidIdFormat } from "../../utils/utils.ts";

export const updateUser: Callback = async (req, res) => {
    try {
      const data = await parseData(req);
      const user = JSON.parse(data) || {};
      if (isNotValidIdFormat(user.id)) {
        throw new Error("400");
      }
      const response = await dbAPI.updateUser(user);
      if (!response) {
        throw new Error("404");
      } else {
        const serverResponse = { message: "successfully updated", response };
        sendResponse(200, serverResponse, res);
      }
    } catch ({ message }) {
      if (Number(message)) {
        const errorMessage = getUserError(message);
        sendResponse(Number(message), errorMessage, res);
      } else {
        sendResponse(404, "Invalid data", res);
      }
    }
  };