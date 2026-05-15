import {pool} from "../../index.js";

export const getusersquery = async (user_id = null) => {
    let rowsData = [];
    if (user_id) {
        let {rows} = await pool.query(`Select * from amazon.users where user_id = ${user_id}`);
        rowsData = rows;
    } else {
        let {rows} = await pool.query(`Select * from amazon.users`);
        rowsData = rows;
    }
    return rowsData;
};

export const postuserquery = async (record) => {
    let {user_name, user_email, user_contact_no,user_gender} = record;
    console.log(user_name, user_email, user_contact_no,user_gender)
    await pool.query(
      `insert into amazon.users (user_name,user_email,user_contact_no,user_gender) 
       values ('${user_name}','${user_email}','${user_contact_no}','${user_gender}')`
);
};
