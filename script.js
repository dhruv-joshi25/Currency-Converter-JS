const URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

const countryOption = document.querySelectorAll(".select-container select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of countryOption) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if ((select.name === "from" && currCode === "USD") || (select.name === "to" && currCode === "INR")) {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", () => {
        updateFlag(select);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = 1;
    }
    const ourURL = `${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(ourURL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (event) => {
    await event.preventDefault();
    updateExchangeRate(); 
});
