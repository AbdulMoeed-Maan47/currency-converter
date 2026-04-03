const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll("form select");
const btn = document.querySelector(".btn");
const input = document.querySelector(".amount input");
const msg = document.querySelector(".msg");

const fromCurrCode = "USD";
const toCurrCode = "PKR";

const setFlag = (selectElement) => {
  const currCode = selectElement.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = selectElement.parentElement.querySelector("img");
  img.src = newSrc;
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === fromCurrCode) {
      select.value = currCode;
      setFlag(select);
    } else if (select.name === "to" && currCode === toCurrCode) {
      select.value = currCode;
      setFlag(select);
    }
  }

  select.addEventListener("input", (evt) => {
    setFlag(evt.target);
  });
}

input.addEventListener("change", (evt) => {
  const amount = evt.target.value;
  if (amount === "" || amount < 0) {
    input.value = 1;
  }
});

const updateMsg = async () => {
  const amount = input.value;
  const fromCurr = dropdowns[0].value.toLowerCase();
  const toCurr = dropdowns[1].value.toLowerCase();

  const URL = `${BASE_URL}/${fromCurr}.json`;
  const response = await fetch(URL);
  const data = await response.json();
  const rate = data[fromCurr][toCurr];

  const finalAmount = amount * rate;
  msg.innerText = `${amount} ${fromCurr} = ${finalAmount} ${toCurr}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateMsg();
});

window.addEventListener("load", () => {
  updateMsg();
});
