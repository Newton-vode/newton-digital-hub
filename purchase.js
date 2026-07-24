export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { phone, volume, network } = req.body;

    const reference = "NEWTON-" + Date.now();

    const response = await fetch(
      `https://console.hubnet.app/live/api/context/business/transaction/${network}`,
      {
        method: "POST",
        headers: {
          "token": `Bearer ${process.env.HUBNET_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          volume,
          reference,
          referrer: process.env.HUBNET_REFERRER,
          webhook: process.env.HUBNET_WEBHOOK
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Transaction failed",
      error: error.message
    });
  }
}