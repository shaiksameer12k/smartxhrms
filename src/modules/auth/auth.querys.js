import { pool } from "../../index.js";

export const verifyUserInDB = async (verifydata) => {
  let { rows } = await pool.query(
    `select * from amazon.users where user_contact_no = '${verifydata}' or user_email = '${verifydata}'`,
  );
  console.log("verifyUserInDB", rows);
  return rows;
};
