import nodemailer from "nodemailer";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  date: string;
  notes?: string;
};

export async function sendBookingNotification(payload: BookingPayload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL } =
    process.env;

  const subject = `New appointment request — ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred date: ${payload.date}`,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !BOOKING_TO_EMAIL) {
    // SMTP isn't configured yet (e.g. local dev, or before the Hostinger
    // mailbox exists) — log instead of failing the request.
    console.log(
      "[booking] SMTP not configured — logging request instead of emailing:\n",
      text,
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: BOOKING_FROM_EMAIL || SMTP_USER,
    to: BOOKING_TO_EMAIL,
    replyTo: payload.email,
    subject,
    text,
  });
}
