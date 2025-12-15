function getStatusEmailHTML(statusInfo, order, status) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #111; border: 1px solid #22c55e; border-radius: 12px; overflow: hidden; color: #fff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(to bottom, #052e16, #111); padding: 30px 20px; text-align: center;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">jeevaLeaf</h1>
            <p style="color: #22c55e; margin: 5px 0 0; font-size: 14px;">Bring life in our home 🌿</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">
            <h2 style="color: #22c55e; margin-top: 0; font-size: 20px;">${statusInfo.subject}</h2>
            
            <p style="color: #e5e5e5; font-size: 16px; margin-bottom: 20px;">
              Hello <strong>${order.deliveryName ? order.deliveryName.split(' ')[0] : 'Customer'}</strong>,<br>
              ${statusInfo.message}
            </p>

            <!-- Details Section with Yellow Bar -->
            <div style="border-left: 4px solid #fbbf24; padding-left: 15px; margin-bottom: 30px; margin-top: 20px;">
              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
              <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-family: monospace;">${order._id.toString().slice(-6).toUpperCase()}</p>
              
              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Status</p>
              <div style="margin-bottom: 15px;">
                <span style="background-color: #22c55e; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">${String(status).toUpperCase()}</span>
              </div>

              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</p>
              <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: bold;">₹${Number(order.total || 0).toFixed(2)}</p>
            </div>

            <p style="color: #a1a1aa; font-size: 14px; margin-top: 30px; text-align: center;">
              Thank you for shopping with jeevaLeaf!
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333;">
            <p style="margin: 0; color: #666; font-size: 14px;">For support: <a href="mailto:support@jeevaleaf.com" style="color: #3b82f6; text-decoration: none;">support@jeevaleaf.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { getStatusEmailHTML };