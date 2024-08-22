function formatNumber(value) {
  return value < 10 ? "0" + value : value.toString();
}

function populateSelectBoxes() {
  const dateSelect = document.getElementById("dateSelect");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  // Populate date options
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = formatNumber(i);
    option.textContent = formatNumber(i);
    dateSelect.appendChild(option);
  }

  // Populate month options
  for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.value = formatNumber(i);
    option.textContent = formatNumber(i);
    monthSelect.appendChild(option);
  }

  // Populate year options
  for (let i = 1800; i <= 3000; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  // Set default year to current year
  const currentYear = new Date().getFullYear();
  yearSelect.value = currentYear;
  document.getElementById("yearInput").value = currentYear;
  updateDaysInMonth(); // Ensure days are updated with default year
}

function updateDaysInMonth() {
  const dateSelect = document.getElementById("dateSelect");
  const month = parseInt(document.getElementById("monthSelect").value, 10);
  const year = parseInt(document.getElementById("yearSelect").value, 10);

  if (month && year) {
    const daysInMonth = new Date(year, month, 0).getDate();

    while (dateSelect.options.length > daysInMonth) {
      dateSelect.remove(dateSelect.options.length - 1);
    }

    while (dateSelect.options.length < daysInMonth) {
      let option = document.createElement("option");
      option.value = formatNumber(dateSelect.options.length + 1);
      option.textContent = formatNumber(dateSelect.options.length + 1);
      dateSelect.appendChild(option);
    }

    // Ensure selected date is valid after changing days
    if (parseInt(dateSelect.value, 10) > daysInMonth) {
      dateSelect.value = formatNumber(daysInMonth);
    }
  }
}

function updateYearFromInput() {
  const yearInput = document.getElementById("yearInput").value;
  const yearSelect = document.getElementById("yearSelect");
  if (yearInput) {
    yearSelect.value = yearInput;
  }
  updateDaysInMonth();
}

function updateMonthFromInput() {
  const monthInput = document.getElementById("monthInput").value;
  const monthSelect = document.getElementById("monthSelect");
  if (monthInput) {
    monthSelect.value = formatNumber(parseInt(monthInput, 10));
  }
  updateDaysInMonth();
}

function updateDateFromInput() {
  const dateInput = document.getElementById("dateInput").value;
  const dateSelect = document.getElementById("dateSelect");
  if (dateInput) {
    dateSelect.value = formatNumber(parseInt(dateInput, 10));
  }
}

function updateYearFromSelect() {
  const yearSelect = document.getElementById("yearSelect");
  document.getElementById("yearInput").value = yearSelect.value;
  updateDaysInMonth();
}

function updateMonthFromSelect() {
  const monthSelect = document.getElementById("monthSelect");
  document.getElementById("monthInput").value = monthSelect.value;
  updateDaysInMonth();
}

function updateDateFromSelect() {
  const dateSelect = document.getElementById("dateSelect");
  document.getElementById("dateInput").value = dateSelect.value;
}

function validateDate(day, month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

function getAge() {
  const d1 = parseInt(document.getElementById("dateSelect").value, 10);
  const m1 = parseInt(document.getElementById("monthSelect").value, 10);
  const y1 = parseInt(document.getElementById("yearSelect").value, 10);

  if (!validateDate(d1, m1, y1)) {
    document.getElementById("age").innerHTML = "Invalid Date!";
    return;
  }

  const date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 += monthLengths[m2 - 1];
    m2 -= 1;
  }
  if (m1 > m2) {
    m2 += 12;
    y2 -= 1;
  }

  const d = d2 - d1;
  const m = m2 - m1;
  const y = y2 - y1;

  document.getElementById("age").innerHTML =
    "Your Age is " + y + " Years " + m + " Months " + d + " Days";
}

// Initialize the select boxes and default values when the page loads
populateSelectBoxes();

// Event listeners for synchronizing input fields and dropdowns
document
  .getElementById("yearInput")
  .addEventListener("input", updateYearFromInput);
document
  .getElementById("monthInput")
  .addEventListener("input", updateMonthFromInput);
document
  .getElementById("dateInput")
  .addEventListener("input", updateDateFromInput);
document
  .getElementById("yearSelect")
  .addEventListener("change", updateYearFromSelect);
document
  .getElementById("monthSelect")
  .addEventListener("change", updateMonthFromSelect);
document
  .getElementById("dateSelect")
  .addEventListener("change", updateDateFromSelect);
