const { sendWithRetry, FROM } = require('./sendgridClient');

async function sendOtpEmail(email, otp) {
  const msg = {
    to: email,
    from: FROM,
    subject: '🔐 Your OTP for JeevaLeaf',
    html: `
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #111; border: 1px solid #22c55e; border-radius: 12px; overflow: hidden; color: #fff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(to bottom, #052e16, #111); padding: 30px 20px; text-align: center;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">jeevaLeaf</h1>
            <p style="color: #22c55e; margin: 5px 0 0; font-size: 14px;">Bring life in our home 🌿</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Password Verification</h2>
            <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px;">
              Use the OTP below to verify your account or reset your password.
            </p>

            <div style="margin: 30px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #22c55e; background-color: #052e16; padding: 15px 40px; border: 1px dashed #22c55e; border-radius: 8px;">
                    ${otp}
                </span>
            </div>
            
            <p style="color: #666; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>

          <!-- Footer -->
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333;">
            <p style="margin: 0; color: #666; font-size: 14px;">For support: <a href="mailto:support@jeevaleaf.com" style="color: #3b82f6; text-decoration: none;">support@jeevaleaf.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return await sendWithRetry(msg, 'OTP');
}

module.exports = { sendOtpEmail };
