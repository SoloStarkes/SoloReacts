import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { restaurantName } = req.body;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Numbers stored in environment variables
    const girlfriendNumber = process.env.GIRLFRIEND_NUMBER;
    const yourNumber = process.env.MY_NUMBER;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    // Message to girlfriend
    await client.messages.create({
      body: `💌 Your ${restaurantName} gift card is on its way! 🎁`,
      from: fromNumber,
      to: girlfriendNumber,
    });

    // Message to you
    await client.messages.create({
      body: `✅ She picked: ${restaurantName}`,
      from: fromNumber,
      to: yourNumber,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
}
