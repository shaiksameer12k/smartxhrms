import jwt from "jsonwebtoken";
import { extract_token_from_header, verify_token } from "./jwt_token.js";

export const authjwtmiddleware = async (req, res, next) => {
  const { success, token, message } = extract_token_from_header(req);

  if (!success) {
    return res.status(401).json({ message });
  }

  const result = await verify_token(token, req);
  
  if (!result.success) {
    return res.status(401).json({ message: result.message });
  }

  req.user = result.data;

  next();
};
