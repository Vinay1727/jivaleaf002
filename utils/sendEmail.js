import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderConfirmationEmail = async (to, order) => {
  console.log("SENDGRID API MAIL CALLED for:", to);

  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM,
    subject: "Order Confirmed 🌱 | JeevaLeaf",
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p>Your plants will reach you soon 🌿</p>
    `,
  });

  console.log("SENDGRID API MAIL SENT SUCCESSFULLY");
};
