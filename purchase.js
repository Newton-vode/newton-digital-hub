export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {
    const { phone, volume, network, reference } = req.body;

    if (!phone || !volume || !network || !reference) {
      return res.status(400).json({
        message: "Missing order information"
      });
    }

    const networkMap = {
      MTN: "mtn",
      AirtelTigo: "at",
      Telecel: "big-time"
    };

    const hubnetNetwork = networkMap[network];

    if (!hubnetNetwork) {
      return res.status(400).json({
        message: "Unsupported network"
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      return res.status(400).json({
        message: "Phone number must contain exactly 10 digits"
      });
    }

    const volumeMB = String(volume);

    const hubnetResponse = await fetch(
      `https://console.hubnet.app/live/api/context/business/transaction/${hubnetNetwork}-new-transaction`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${process.env.HUBNET_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: cleanPhone,
          volume: volumeMB,
          reference,
          referrer: process.env.HUBNET_REFERRER,
          webhook: process.env.HUBNET_WEBHOOK
        })
      }
    );

    const responseText = await hubnetResponse.text();

    let hubnetData;

    try {
      hubnetData = JSON.parse(responseText);
    } catch {
      hubnetData = {
        message: responseText
      };
    }

    return res.status(hubnetResponse.status).json(hubnetData);

  } catch (error) {
    return res.status(500).json({
      message: "Transaction failed",
      error: error.message
    });
  }
}