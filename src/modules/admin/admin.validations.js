import yup, { string } from "yup";

export const adminSchema = yup.object({
  user_name: string().required().min(5, "user_name : MIN 5 Charters Requred"),
  user_email: string().email().required(),
});


