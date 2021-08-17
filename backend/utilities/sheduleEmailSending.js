import cron from "node-cron";
import Email from "../models/emailModel.js";
import CompletedEmail from "../models/completedEmailModel.js";
import { sendEmail } from "./sendEmail.js";
import messages from "../data/messages.js";

export const cronJobs = {};

export const sheduleEmailSending = (emailName, emailId) => {
  const cronJobName = `cronJob_${emailId}`;

  const cronJob = cron.schedule("*/5 * * * * *", () => {
    (async () => {
      try {
        let email = await Email.findOne({ email: emailName });

        if (email.stage < 10 && messages[email.stage - 1]) {
          sendEmail(
            emailName,
            `${messages[email.stage - 1].subject} (${email.stage})`,
            `${messages[email.stage - 1].message}`
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
