document.addEventListener("DOMContentLoaded", function(){

const networkInput = document.getElementById("network");
const bundleSelect = document.getElementById("bundle");
const priceDisplay = document.getElementById("price");
const summaryNetwork = document.getElementById("summaryNetwork");
const summaryBundle = document.getElementById("summaryBundle");
const summaryAmount = document.getElementById("summaryAmount");
const phoneInput = document.getElementById("phone");
const summaryPhone = document.getElementById("summaryPhone");

window.selectNetwork = function(network){

    networkInput.value = network;

    bundleSelect.innerHTML =
    '<option value="">Choose Bundle</option>';

    let bundles = [];


    if(network === "MTN"){
        bundles = [1,2,3,5,10,15,20,25,50];
    }


    if(network === "Telecel"){
        bundles = [5,10,15,20];
    }


    if(network === "AirtelTigo"){
        bundles = [5,10,15,20];
    }


    bundles.forEach(function(gb){

        let price = calculatePrice(network, gb);

        let option = document.createElement("option");

        option.value = gb;

        option.textContent =
        gb + "GB - GH₵" + price.toFixed(2);

        option.setAttribute("data-price", price);

        bundleSelect.appendChild(option);

    });

};



function calculatePrice(network, gb){

    if(network === "MTN"){
        return gb * 6;
    }


    if(network === "Telecel"){
        return (gb / 5) * 23.50;
    }


    if(network === "AirtelTigo"){
        return (gb / 5) * 25.50;
    }


    return 0;

}



bundleSelect.addEventListener("change", function(){

    let selected =
    bundleSelect.options[bundleSelect.selectedIndex];

    let price =
    selected.getAttribute("data-price");


    if(price){

        priceDisplay.innerHTML =
        "Price: GH₵" + Number(price).toFixed(2);


        summaryNetwork.textContent =
        "Network: " + networkInput.value;


        summaryBundle.textContent =
        "Bundle: " + selected.textContent;


        summaryAmount.textContent =
        "Amount: GH₵" + Number(price).toFixed(2);

    }

});

phoneInput.addEventListener("input", function(){

    summaryPhone.textContent =
    "Phone: " + phoneInput.value;

});
});