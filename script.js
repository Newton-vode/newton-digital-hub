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

        alert(JSON.stringify(result));

    } catch (error) {
        alert(error.message);
        console.log(error);
    }
});