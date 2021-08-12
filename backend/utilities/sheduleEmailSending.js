import cron from "node-cron";
import Email from "../models/emailModel.js";
import CompletedEmail from "../models/CompletedEmailModel.js";
import { sendEmail } from "./sendEmail.js";

export const cronJobs = {};

export const sheduleEmailSending = (emailName, emailId) => {
  const cronJobName = `cronJob_${emailId}`;

  const cronJob = cron.schedule("*/5 * * * * *", () => {
    (async () => {
      try {
        let email = await Email.findOne({ email: emailName });

        if (email.stage < 10) {
          sendEmail(
            emailName,
            `Zpráva ${email.stage}`,
            `Toto je zkušební zpráva ${email.stage}`
          );
          await Email.updateOne(
            { email: emailName },
            { stage: email.stage + 1 }
          );

          return;
        }

        const completedEmail = new CompletedEmail({
          email: emailName,
        });

        await completedEmail.save();
        await Email.deleteOne({ email: emailName });
        cronJobs[cronJobName].stop();
        delete cronJobs[cronJobName];
      } catch (err) {
        console.log(err);
      }
    })();
  });

  cronJobs[cronJobName] = cronJob;

  cronJobs[cronJobName].start();
};
