const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

async function fetchCurrencies() {
  try {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json();

    for (const code in data) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.text = option2.text = `${code} - ${data[code]}`;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    fromCurrency.value = "USD";
    toCurrency.value = "THB";
  } catch (err) {
    console.error("Error fetching:", err);
    resultDiv.innerText = "ไม่สามารถโหลดรายการสกุลเงินได้";
  }
}

fetchCurrencies();

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.innerText = "กรุณากรอกจำนวนเงินที่ถูกต้อง";
    return;
  }

  if (from === to) {
    resultDiv.innerText = `${amount} ${from} = ${amount} ${to}`;
    return;
  }

  try {
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    const res = await fetch(url);
    const data = await res.json();
    const converted = data.rates[to];
    resultDiv.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (err) {
    console.error("Conversion error:", err);
    resultDiv.innerText = "เกิดข้อผิดพลาดในการแปลงสกุลเงิน";
  }
}
