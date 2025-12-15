const { sendWithRetry, FROM } = require('./sendgridClient');

const API_BASE = "https://newplant-9.onrender.com";

async function sendOrderEmail(order) {
  const itemsHtml = order.items.map(i => `
    <tr style="border-bottom: 1px solid #166534;">
      <td style="padding: 12px; color: #e5e7eb;">
        <div style="font-weight: bold; color: #ffffff;">${i.name}</div>
        <div style="font-size: 12px; color: #9ca3af;">Qty: ${i.quantity}</div>
      </td>
      <td style="padding: 12px; text-align: right; color: #4ade80; font-weight: bold;">₹${i.price}</td>
    </tr>
  `).join('');

  // Safely handle potentially missing delivery details if order object structure varies
  const addressHtml = order.deliveryAddress ? `
    <div style="margin-bottom: 20px; background-color: #0a1a12; padding: 15px; border-radius: 8px; border: 1px solid #166534;">
        <h3 style="color: #4ade80; margin-top: 0; font-size: 16px;">Delivery Details</h3>
        <p style="color: #d1d5db; font-size: 14px; margin: 5px 0;"><strong>${order.deliveryName || 'Customer'}</strong></p>
        <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">${order.deliveryAddress}</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">${order.deliveryLocation || ''}</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">${order.deliveryPhone || ''}</p>
    </div>` : '';

  const msg = {
    to: order.deliveryEmail,
    from: FROM,
    subject: `✅ Order Confirmed – #${order._id.toString().slice(-6).toUpperCase()}`,
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
          <div style="padding: 30px;">
            <h2 style="color: #22c55e; margin-top: 0; font-size: 20px;">✅ Your Order Has Been Confirmed!</h2>
            
            <p style="color: #e5e5e5; font-size: 16px; margin-bottom: 20px;">
              Hello <strong>${order.deliveryName ? order.deliveryName.split(' ')[0] : 'there'}</strong>,<br>
              Great news! Your order has been placed successfully and is being prepared.
            </p>

            <!-- Details Section with Yellow Bar -->
            <div style="border-left: 4px solid #fbbf24; padding-left: 15px; margin-bottom: 30px; margin-top: 20px;">
              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
              <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-family: monospace;">${order._id.toString().slice(-6).toUpperCase()}</p>
              
              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Status</p>
              <div style="margin-bottom: 15px;">
                <span style="background-color: #22c55e; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">CONFIRMED</span>
              </div>

              <p style="margin: 0 0 5px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</p>
              <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: bold;">₹${order.total}</p>
            </div>

            <!-- Items Table -->
            <div style="background-color: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                <table width="100%" cellspacing="0" cellpadding="0">
                    <thead style="background-color: #0f291e;">
                        <tr>
                            <th style="padding: 10px 15px; text-align: left; color: #fbbf24; font-size: 12px; text-transform: uppercase;">Item</th>
                            <th style="padding: 10px 15px; text-align: right; color: #fbbf24; font-size: 12px; text-transform: uppercase;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                 <a href="${API_BASE.replace('/api', '')}/myorders" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Track Order</a>
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
    `
  };

  return await sendWithRetry(msg, 'ORDER_CONFIRMATION');
}

module.exports = { sendOrderEmail };
