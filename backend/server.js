import path from "path";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import emailRouter from "./routes/emailRouter.js";
import wakeUpHeroku from "./utilities/wakeUpHeroku.js";
import scheduleEmailsInDatabase from "./utilities/scheduleEmailsInDatabase.js";

// Javascritp Module type does not have environment variables, dotenv creates that
dotenv.config();

// Hack because of localhost emailing - in there is no SSL certificate
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Javascritp Module type does not have _dirname variable, so we creat that
const __dirname = path.resolve();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + "/frontend/build"));

app.use("/api/emails", emailRouter);

app.get("*", (req, res) => {
  console.log("A new request received at " + new Date().toLocaleTimeString());
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  scheduleEmailsInDatabase();
  wakeUpHeroku();
});
