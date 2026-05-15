import {APIResponse} from "../../utils/APIResponse.js";
import {getusersquery, postuserquery} from "./users.querys.js";

export const getusers = async (req, res) => {
    let rows = await getusersquery();
    return res.status(200).json(new APIResponse(200, "Successfully Fetch Users", false, rows));
};

export const getusers_id = async (req, res) => {
    let {user_id} = req.params;
    let rows = await getusersquery(user_id);

    return res.status(200).json(new APIResponse(200, "Successfully Fetch Users", false, rows));
};

export const postuser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json(new APIResponse(400, "Invalid User Data", true, []));
    }

    let rows = await postuserquery(req.body);
    return res.status(200).json(new APIResponse(200, "Successfully User Inserted ", false, rows));
};
