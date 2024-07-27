document.addEventListener("DOMContentLoaded", function() {
    let amountInput = document.getElementById('amount');
    let mortgageYearInput = document.getElementById('mortgage-year');
    let interestRateInput = document.getElementById('interest-rate');
    let submitButton = document.getElementById('submit');
    submitButton.classList.add('submitButtonStyle');
    let resultElement = document.getElementById('displayResult');
    let resultElementer = document.getElementById('displayResulter');
    let totalPayElement = document.getElementById('totalPay');
    let totalPayElementer = document.getElementById('totalPayer');
    let radioButtons = document.querySelectorAll('input[name="mortgage-type"]');

    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            radioButtons.forEach(btn => btn.parentElement.classList.remove('selected'));

            this.parentElement.classList.add('selected');
        });
    });

    submitButton.addEventListener("click", function(e) {
        e.preventDefault();

        let amount = parseFloat(amountInput.value);
        let mortgageYear = parseFloat(mortgageYearInput.value);
        let interestRate = parseFloat(interestRateInput.value);

        let selectedRadio = document.querySelector('input[name="mortgage-type"]:checked');
        if (!selectedRadio) {
            alert("Please select a mortgage type.");
            return;
        }

        let mortgageType = selectedRadio.value;
        let mortgage = new Mortgage(amount, mortgageYear, interestRate);
        let result;

        if (mortgageType === 'repayment') {
            result = mortgage.calculateRepayment();
            submitButton.textContent = "Calculate Repayment";
            resultElement.textContent = `Your monthly repayment `;
            resultElementer.textContent = `$${result.monthlyRepayment.toFixed(2)}`;
            totalPayElement.textContent = `Total you will repay over the term `;
            totalPayElementer.textContent = `$${result.totalRepay.toFixed(2)}`;
        } else if (mortgageType === 'interest-only') {
            result = mortgage.calculateInterestOnly();
            submitButton.textContent = "Calculate Interest Only";
            resultElement.textContent = `Your monthly interest is `;
            resultElementer.textContent = `$${result.monthlyInterest.toFixed(2)}`;
            totalPayElement.textContent = "Total you will repay over the term ";
            totalPayElementer.textContent = `$${result.totalRepay.toFixed(2)}`;
        }

        // Highlight selected radio button
        radioButtons.forEach(button => {
            button.parentElement.classList.remove('selected');
        });
        selectedRadio.parentElement.classList.add('selected');
    });

    class Mortgage {
        constructor(amount, term, rate) {
            this.amount = amount;
            this.term = term;
            this.rate = rate / 100;
        }

        calculateRepayment() {
            let monthlyRate = this.rate / 12;
            let numberOfPayments = this.term * 12;
            let monthlyRepayment = this.amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            let totalRepay = monthlyRepayment * numberOfPayments;
            return { monthlyRepayment, totalRepay };
        }

        calculateInterestOnly() {
            let monthlyInterest = this.amount * (this.rate / 12);
            let totalRepay = monthlyInterest * 12 * this.term;
            return { monthlyInterest, totalRepay };
        }
    }
});
