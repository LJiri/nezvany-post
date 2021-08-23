import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Email from "../models/emailModel.js";
import { sheduleEmailSending } from "../utilities/sheduleEmailSending.js";
import { sendEmail } from "../utilities/sendEmail.js";
import messages from "../data/messages.js";

const emailRouter = express.Router();

emailRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // const createdEmails = await Email.deleteMany({});
    const createdEmails = await Email.insertMany(data.emails);
    res.send({ createdEmails });
  })
);

emailRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const email = new Email({
      email: req.body.email,
      stage: 1,
    });

    const createdEmail = await email.save();

    res.send({
      _id: createdEmail._id,
      email: createdEmail.email,
      stage: createdEmail.stage,
    });

    sendEmail(
      createdEmail.email,
      `${messages[0].subject}`,
      `${messages[0].message}`
    );

    sheduleEmailSending(createdEmail.email, createdEmail._id);
  })
);

export default emailRouter;
