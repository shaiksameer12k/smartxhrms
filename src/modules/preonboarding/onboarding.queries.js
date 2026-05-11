import { pool } from "../../index.js";

export const getonboardingListQuery = async () => {
  let { rows } = await pool.query(`SELECT * FROM trigger_pre_boarding`);
  return rows;
};

export const postonboardingListQuery = async (data) => {
  console.log("data", data);
  let { firstname, middlename, lastname, dob, email, mobileno } = data;
  await pool.query(
    `select trigger_pre_onboarding('${firstname}', '${middlename}', '${lastname}', '${dob}', '${email}', '${mobileno}')`,
  );
  return [];
};

export const getOnboardingEmpFullDetailsQuery = async (id) => {
  try {
    const [
      personal_details,
      family_details,
      education_details,
      documents_details,
    ] = await Promise.all([
      pool.query(`SELECT * FROM personal_details WHERE trigger_emp_id = $1`, [
        id,
      ]),
      pool.query(`SELECT * FROM family_details WHERE trigger_emp_id = $1`, [
        id,
      ]),
      pool.query(`SELECT * FROM education_details WHERE trigger_emp_id = $1`, [
        id,
      ]),
      pool.query(`SELECT * FROM document_details WHERE trigger_emp_id = $1`, [
        id,
      ]),
    ]);

    return {
      personal_details: personal_details.rows,
      family_details: family_details.rows,
      education_details: education_details.rows,
      documents_details: documents_details.rows,
    };
  } catch (error) {
    console.error("Error fetching onboarding employee full details:", error);
    throw error;
  }
};
