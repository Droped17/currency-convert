// fetch data from API
let apiData;
let resultOfConvert;
const fetchData = async () => {
  try {
    const apiUrl = "https://www.floatrates.com/daily/thb.json";
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Something Wrong");
    }
    const data = await res.json();
    showSelect(data);
    apiData = await data;
  } catch (error) {
    console.log(error);
  }
};
fetchData();

const handleSelectChange = () => {
  const selectCurrentcy = selectBox.value;
  // console.log(selectCurrentcy);
  return selectCurrentcy;
};

// get option from API data
const showSelect = (data) => {
  const jsonData = data;
  console.log(jsonData);
  const selectBox = document.getElementById("selectBox");

  for (const currencyCode in jsonData) {
    if (jsonData.hasOwnProperty(currencyCode)) {
      const option = document.createElement("option");
      option.text = currencyCode;
      selectBox.appendChild(option);
    }
  }
  selectBox.addEventListener("change", handleSelectChange);
};

// Convert Data
const convert = () => {
  const inputValue = document.getElementById("userInput").value;
  console.log(inputValue);
  const selectData = handleSelectChange();
  const selectedCurrencyData = apiData[selectData];
  console.log(selectedCurrencyData);

  const result = inputValue * selectedCurrencyData.inverseRate;

  console.log(result);

  const output = document.getElementById("output");

  if (!resultOfConvert) {
    resultOfConvert = document.createElement("p");
    output.appendChild(resultOfConvert);
  }

  resultOfConvert.textContent = result;
};

document.getElementById("convert").addEventListener("click", (e) => {
  e.preventDefault();
});
document.getElementById("convert").addEventListener("click", convert);
