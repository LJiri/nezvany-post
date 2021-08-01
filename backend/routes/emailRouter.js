import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Email from "../models/emailModel.js";

const emailRouter = express.Router();

emailRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // const createdEmails = await Email.deleteMany({});
    const createdEmails = await Email.insertMany(data.emails);
    res.send({ createdEmails });
  })
);

export default emailRouter;
