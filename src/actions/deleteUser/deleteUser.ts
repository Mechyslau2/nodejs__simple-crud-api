//@ts-ignore
import { Callback } from "./actions/actionsTypes.ts";
//@ts-ignore
import * as dbAPI from "../../dbAPI/dbAPI.ts";
//@ts-ignore
import { getUserError } from "../../errors/error.ts";
//@ts-ignore
import { parseData, sendResponse, isNotValidIdFormat } from "../../utils/utils.ts";


export const deleteUser: Callback = async (req, res) => {
    try {
      const data = await parseData(req);
      const { id } = JSON.parse(data) || {};
      if (isNotValidIdFormat(id)) {
        throw new Error("400");
      }
      const response = await dbAPI.deleteUser(id);
      if (!response) {
        throw new Error("404");
      } else {
        sendResponse(204, "", res);
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
