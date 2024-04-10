const { Vonage } = require("@vonage/server-sdk");
require("dotenv").config();
const secret = process.env.VONAGE_API_SECRET;
const key = process.env.VONAGE_API_KEY;

const vonage = new Vonage({
  apiKey: key,
  apiSecret: secret,
});

const sendSMS = async (to, code) => {
  const text = `your verfication code is : ${code}`;
  await vonage.sms
    .send({ to, from: "ServiceNow", text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
};

module.exports = sendSMS;
