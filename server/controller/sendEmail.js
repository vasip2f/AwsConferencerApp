const nodemailer = require('nodemailer');
const express = require("express");
const sendEmail = express.Router();
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"vkservice24hr@gmail.com",
        pass:"qdlrkyzhliyjlkrx"
    }

})

sendEmail.post("/send/:name/:to",async(req, res)=>{
    const {name,to}=req.params
        const mailOptions = {
            from:"vkservice24hr@gmail.com",
            to:to,
            subject: `Thanks For your Booking.! ${name}`,
            // text:`hi, Your Event is Confirmed `
            text: `Hi ${name},\n\nThank you for booking our event! We are excited to have you join us.\n\nSee you soon!\n\nBest regards,\nThe Event Team`
        }

        transporter.sendMail(mailOptions,async(err, info) => {
            if(err) {
                res.send(err.message)
            }
            else{
                res.send("Email sent successfully")
            }
        })
});

//id code
// sendEmail.post("/send/:name/:to/:eventId", async (req, res) => {
//     const { name, to, eventId } = req.params;

//     try {
//         const event = await Event.findById(eventId);
//         console.log(event)
//         if (!event) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         const mailOptions = {
//             from: "vkservice24hr@gmail.com",
//             to: to,
//             subject: `Event is confirmed ${name}`,
//             text: `Event Details:
//                 Event ID: ${event._id}
//                 Room Name: ${event.roomName}
//                 Start Time: ${event.StartTime}
//                 End Time: ${event.EndTime}
//                 `
//         };

//         transporter.sendMail(mailOptions, async (err, info) => {
//             if (err) {
//                 res.status(500).json({ message: "Failed to send email", error: err });
//             } else {
//                 res.status(200).json({ message: "Email sent successfully" });
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Something went wrong", error: err });
//     }
// });

  module.exports = sendEmail;
