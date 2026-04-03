const dropdowns = document.querySelectorAll("form select");

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
