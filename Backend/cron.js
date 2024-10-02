import cron from "cron";
import https from "https";

const URL = "https://expense-tracker-with-graphql.onrender.com";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Expense Tracker API is running");
      } else {
        console.log("Expense Tracker API is not running ", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error(e);
    });
});

export default job;
