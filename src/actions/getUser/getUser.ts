//@ts-ignore
import { getUserError } from "../../errors/error.ts";
//@ts-ignore
import { parseData, sendResponse, isNotValidIdFormat } from "../../utils/utils.ts";
//@ts-ignore
import * as dbAPI from '../../dbAPI/dbAPI.ts';
//@ts-ignore
import { Callback } from "../../actions/actionsTypes.ts";

export const getUser: Callback = async (req, res) => {
    try {
      const data = await parseData(req);
      const { id } = JSON.parse(data) || {};
      if (isNotValidIdFormat(id)) {
        throw new Error("400");
      }
      const response = await dbAPI.getUserById(id);
      if (!response) {
        throw new Error("404");
      } else {
        const serverResponse = { message: "successfully found", response };
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
  