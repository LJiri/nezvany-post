import Email from "../models/emailModel.js";
import { sheduleEmailSending } from "./sheduleEmailSending.js";

const scheduleEmailsInDatabase = () => {
  (async () => {
    try {
      await Email.find({}, (err, allEmails) => {
        allEmails.forEach((email) => {
          sheduleEmailSending(email.email, email._id);
        });
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

export default scheduleEmailsInDatabase;
