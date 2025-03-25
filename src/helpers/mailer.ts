import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hash token
        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                })

        } else if (emailType === "RESET") {
            User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.Mail_USER_CRED,
                pass: process.env.MAIL_CRED_PASS
                // add these credentials to env
            }
        });

        const mailOptions = {
            from: 'mrinal@gmail.com',
            to: email,
            subject: emailType == "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify the email" : "reset your password"}
            or copy paste the link below to your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`
        }
    
        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}