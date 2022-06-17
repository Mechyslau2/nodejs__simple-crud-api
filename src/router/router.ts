//@ts-ignore
import * as Actions from '../actions/actions.ts';

const customRouter = (pathURL: string) => {
    if (pathURL === '/api/users') {
        return ({
            pathURL,
            'GET': async(req, res) => Actions.getAllUsers(req, res),
        })
    }

    if (pathURL === '/api/users/id') {
        return ({
            pathURL,
            'GET': async(req, res) => Actions.getUser(req, res),
            'POST': async(req, res) => Actions.postUser(req, res),
            'PUT': async(req, res) => Actions.updateUser(req, res),
            'DELETE': async(req, res) => Actions.deleteUser(req, res),
        })
    }
    return null;
};

export default customRouter;

