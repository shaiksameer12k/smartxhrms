import {text} from "express";
import {pool} from "../../index.js";

export const getAdminListQuery = async () => {
    let {rows} = await pool.query(`SELECT * FROM admins`);
    return rows;
};

export const postAdminListQuery = async (data) => {
    let {user_name, user_email} = data;
    try {
        await pool.query(`SELECT CreateNewAdmin('${user_name}','${user_email}')`);
        return [];
    } catch (error) {
        throw error;
    }
};

export const deleteAdminListQuery = async (user_id) => {
    try {
        await pool.query(`select deleteAdminUser(${user_id})`);
        return [];
    } catch (error) {
        throw error;
    }
};
