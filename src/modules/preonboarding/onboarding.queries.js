import {pool} from "../../index.js";

export const getonboardingListQuery = async () => {
    let {rows} = await pool.query(`SELECT * FROM trigger_pre_boarding`);
    return rows;
};

export const postonboardingListQuery = async (data) => {
    console.log("data", data);
    let {firstname, middlename, lastname, dob, email, mobileno} = data;
    await pool.query(
        `select trigger_pre_onboarding('${firstname}', '${middlename}', '${lastname}', '${dob}', '${email}', '${mobileno}')`
    );
    return [];
};
