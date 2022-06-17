//@ts-ignore
import { getUserError, getUserErrorOnCreate  } from "../errors/error.ts";
import { IncomingMessage, ServerResponse } from "http";
//@ts-ignore
import * as dbAPI from "../dbAPI/dbAPI.ts";
//@ts-ignore
import { parseData, createUser, sendResponse, isNotValid, isNotValidIdFormat } from "../utils/utils.ts";

type Callback = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const getAllUsers: Callback = async (req, res) => {
  try {
    const response = await dbAPI.getUsers();
    sendResponse(200, response, res);
  } catch (error) {
    sendResponse(404, 'Something went wrong');
  }
};

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
        const serverResponse = { message: 'successfully found', response}
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

export const deleteUser = async (req, res) => {
    try {
        const data = await parseData(req);
        const { id } = JSON.parse(data) || {};
        if (isNotValidIdFormat(id)) {
            throw new Error('400');
        }
        const response = await dbAPI.deleteUser(id);
        if (!response) {
            throw new Error('404');
        } else {
            const serverResponse = { message: 'successfully deleted', response}
            sendResponse(204, serverResponse, res);
        }
    } catch ({ message }) {
        if (Number(message)) {
            const errorMessage = getUserError(message);
            sendResponse(Number(message), errorMessage, res);
          } else {
            sendResponse(404, "Invalid data", res);
          }
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = await parseData(req);
        const user = JSON.parse(data) || {};
        if (isNotValidIdFormat(user.id)) {
            throw new Error('400');
        }
        const response = await dbAPI.updateUser(user);
        if (!response) {
            throw new Error('404');
        } else {
            const serverResponse = { message: 'successfully updated', response}
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
}