document.getElementById("payBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone: document.getElementById("phone").value,
                network: document.getElementById("network").value,
                volume: document.getElementById("volume").value
            })
        });

        const result = await response.json();

        if (result.status) {
            alert("Order placed successfully!");
        } else {
            alert("Order failed: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        alert("Unable to connect to the server.");
        console.error(error);
    }
});