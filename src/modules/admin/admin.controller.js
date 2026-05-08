import { APIResponse } from "../../utils/APIResponse.js";
import {
  deleteAdminListQuery,
  getAdminListQuery,
  postAdminListQuery,
} from "./admin.queries.js";
import { adminSchema } from "./admin.validations.js";
import asyncHandler from "../../utils/asynchandel.js";

export const getAdminList = asyncHandler(async (req, res) => {
  let result = await getAdminListQuery();
  return res
    .status(200)
    .json(
      new APIResponse(200, "Successfully Admin List Fetched", true, result),
    );
});

export const postAdmin = asyncHandler(async (req, res) => {
  let isValidation = await adminSchema.validate(req.body);
  await postAdminListQuery(req.body);
  return res
    .status(200)
    .json(new APIResponse(200, "Successfully New Admin Inserted", true, []));
});

export const deleteAdmin = async (req, res) => {
  let { user_id } = req?.params;
  await deleteAdminListQuery(user_id);
  return res
    .status(200)
    .json({ message: "Successfully  Admin Deleted", list: [] });
};
