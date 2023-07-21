const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const dotenv = require("dotenv").config({ path: "./.env" });

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
    },
});

async function sendEmail() {
    const template = fs.readFileSync("./templates/hello.ejs", "utf-8");

    const renderedHtml = ejs.render(template, {
        name: "Willy Wonka",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci felis, elementum ac dignissim nec, blandit quis tortor. Sed sit amet finibus nulla. Duis scelerisque quis ante in egestas. Aliquam volutpat non massa in pulvinar. Maecenas sit amet ipsum id justo varius tincidunt. Curabitur mauris magna, lacinia nec ex nec, ullamcorper feugiat urna. Donec sit amet fringilla est, eget vulputate velit. Aliquam a lacus sit amet nisi commodo aliquam. Nunc ut mauris non felis dapibus vulputate. Donec nec massa luctus, tincidunt lectus ut, mattis lorem. Nunc bibendum interdum enim, ut rhoncus leo commodo eu. ",
    });

    const mailOptions = {
        from: process.env.MAIL_OPTIONS_FROM,
        to: process.env.MAIL_OPTIONS_TO,
        subject: "do you think youre better off alone?",
        html: renderedHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error: ", error);
        } else {
            console.log("Info response: ", info.response);
        }
    });
}

sendEmail();
