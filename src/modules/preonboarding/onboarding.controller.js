import { trigger_pre_onboarding_template } from "../../templates/trigger_pre_onboarding_template.js";

import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asynchandel.js";
import sendMail from "../../utils/mailconfg.js";
import { mailQue , mailservices_que} from "../../utils/Ques/mailservices_que.js";

import {
  getonboardingListQuery,
  postonboardingListQuery,
} from "./onboarding.queries.js";
import { onboardingSchema } from "./onboarding.validations.js";

export const getonboardingList = asyncHandler(async (req, res) => {
  let result = await getonboardingListQuery();

  return res
    .status(200)
    .json(
      new APIResponse(200, "Successfully Fetch Onboarding List", false, result),
    );
});


export const postonboardingList = asyncHandler(async (req, res) => {
  let validateData = onboardingSchema.validate(req.body);
  await postonboardingListQuery(req.body);

  // send to mail trigger Que
  mailservices_que(
    sendMail(
      req.body?.email,
      "Welcome To Pre-Onboarding",
      trigger_pre_onboarding_template(req.body),
    )
  );

  return res
    .status(200)
    .json(new APIResponse(200, "Successfully Trigger Onboarding ", true, []));
});
