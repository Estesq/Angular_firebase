const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
require("dotenv").config();

// const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

exports.sendEmail = functions.https.onCall(async (data, context) => {
  if (!data.email) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("invalid-argument",
        "One arguments 'data[email]' is required");
  }
  // Checking that the user is authenticated.
  //   if (!context.auth) {
  //     // Throwing an HttpsError so that the client gets the error details.
  //     throw new functions.https.HttpsError("failed-precondition",
  //         "The function must be called while authenticated.");
  //   }
  // send message via nodemailer
  const authData = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@thetrkr.com",
      pass: "noreply@thetrkr.com",
    },
  });
  try {
    const res = await authData.sendMail({
      from: data.sender,
      to: data.email,
      subject: data.subjet || "",
      text: data.text || "",
      html: data.htmlBody || "",
    });
    console.log("result => ", res);
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.log("error =>", err);
    return {
      success: false,
      error: err,
    };
  }
});
