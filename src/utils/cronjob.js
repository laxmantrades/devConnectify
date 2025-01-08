const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const CONNECTIONREQUEST = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");
cron.schedule("* 23 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStartingDate = startOfDay(yesterday);
    const yesterdayend = endOfDay(yesterday);

    const pendingRequests = await CONNECTIONREQUEST.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStartingDate,
        $lt: yesterdayend,
      },
    }).populate("fromUserID toUserID");
    const listofEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserID.emailId)),
    ];
    for (const email of listofEmails) {
      try {
        
        const res = await sendEmail.run(
          "New Friend Request Pending for" + email,
          "There are so many friend requests pending,please accept or reject the requests"
        );
        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
