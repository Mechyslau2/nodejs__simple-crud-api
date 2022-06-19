
//@ts-ignore
import { sendResponse } from "../../utils/utils.ts";
//@ts-ignore
import * as dbAPI from '../../dbAPI/dbAPI.ts';
//@ts-ignore
import { Callback } from "../../actions/actionsTypes.ts";

export const getAllUsers: Callback = async (req, res) => {
    try {
      const response = await dbAPI.getUsers();
      sendResponse(200, response, res);
    } catch (error) {
      sendResponse(404, "Something went wrong");
    }
  };
