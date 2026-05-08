import {object, string} from "yup";

export const onboardingSchema = object({
    firstname: string().required(),
    middlename: string(),
    lastname: string().required(),
    dob: string().required(),
    email: string().required(),
    mobileno: string().required(),
});
