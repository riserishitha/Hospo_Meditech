const express=require("express");
const Medcard = require("./Medcard");
const router=express.Router();
const nodemailer = require("nodemailer");
const send = require("./message");

router.get("/medcards",(req,res)=>{
    const data=Medcard.find({})
    res.json(data)
})
router.post("/register", async (req, res) => {
    const {  name,
        email,
        phone,
        address,
        registrationType,
        symptoms,
        medications,
        date,
        doctorId} = req.body; 
        console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohanavamsi14@gmail.com', 
            pass: 'wken sosx ofjc cqvu' 
        }
    });

    const mailOptions = {
        from: 'mohanavamsi14@gmail.com',
        to: doctorId,
        subject: 'New Registration',
        html: `<h3>Hey doc your are having a booking on ${date} want to conform if ypu want to take the meting link provided below</h3>  <a href="http://localhost:6001/conform/${email}/${phone}">click this</a><a href="https://hospo.vercel.app/meeting/${email}">meeting link</a>`
    };

    try {
        await send("your doctor will conform and send you the message",phone)
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to send email' });
    }
});
router.post("/conform/:email/:phone", async (req, res) => {
    const { email, phone } = req.params;
    try {
        await Medcard.updateOne({ email, phone }, { status: 'confirmed' });
        const mailOptions = {
            from: 'mohanavamsi16@outlook.com',
            to: email,
            subject: 'New Registration',
            html: `Hey hi your schedule is done join meeting by clicking the lnk below on the scheduled date on 9:30 https://hospo.vercel.app/meeting/${email}`
        };
        await transporter.sendMail(mailOptions);
        await send(`Hey hi your schedule is done join meeting by clicking the lnk below on the scheduled date on 9:30 https://hospo.vercel.app/meeting/${email}`,phone)
        res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm booking' });
    }
});
module.exports=router;