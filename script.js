/* Inputs */
const billAmount = document.getElementById("bill");
const peopleNum = document.getElementById("people");
const customTip = document.getElementById("tip-custom");
/* Buttons */
const tipBtns = document.querySelectorAll(".tip__button");
const resetBtn = document.getElementById("reset");
/* Results */
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

let bill = 0;
let people = 0;
let tip = 0;
let totalplustip = 0;
let tipPercent = 0;
function getInputsData() {
  bill = +billAmount.value;
  if (this.id === "bill") {
    bill = +this.value;
    calculateTip();
  } else if (this.id === "people") {
    people = parseInt(this.value);
    calculateTip();
  }
}

function getTipVal(e) {
  tipPercent = +e.target.dataset.percent;
  calculateTip();
  tipBtns.forEach(function (btn) {
    customTip.value = "";
    btn.classList.remove("tip__button--active");
    if (e.target.dataset.percent == tipPercent) {
      e.target.classList.add("tip__button--active");
    }
  });
}

function getCustomTipVal() {
  resetTipBtns();
  tipPercent = +this.value / 100;
  calculateTip();
}

function calculateTip() {
  if (people > 0) {
    tip = (bill * tipPercent) / people;
    totalplustip = bill / people + tip;
    tipAmount.innerHTML = "$" + tip.toFixed(2);
    totalAmount.innerHTML = "$" + totalplustip.toFixed(2);
    resetBtn.removeAttribute("disabled");
  } else {
    const zero = 0;
    tipAmount.innerHTML = "$" + zero.toFixed(2);
    totalAmount.innerHTML = "$" + zero.toFixed(2);
    resetBtn.setAttribute("disabled", "true");
  }
}

function resetTipBtns() {
  tipBtns.forEach(function (btn) {
    btn.classList.remove("tip__button--active");
  });
}

function resetInputs() {
  billAmount.value = "";
  peopleNum.value = "";
  customTip.value = "";
  bill = 0;
  people = 0;
  resetTipBtns();
  calculateTip();
}

tipBtns.forEach(function (btn) {
  btn.addEventListener("click", getTipVal);
});
customTip.addEventListener("input", getCustomTipVal);
billAmount.addEventListener("input", getInputsData);
peopleNum.addEventListener("input", getInputsData);
resetBtn.addEventListener("click", resetInputs);
