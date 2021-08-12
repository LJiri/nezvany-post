import cron from "node-cron";
import axios from "axios";

const wakeUpHeroku = () => {
  cron.schedule("*/15 * * * *", () => {
    axios.get("https://nezvany-post.herokuapp.com/");
  });
};

export default wakeUpHeroku;
