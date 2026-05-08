import {createTransport} from "nodemailer";

const sendMail = async (email, subject, html) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PSW,
        },
    });

    let result = await transport.sendMail({
        from: process.env.GMAIL_APP_USER,
        to: email,
        subject,
        html,
    });

    return;
};

export default sendMail;
