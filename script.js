document.getElementById('calculateEMIButton').addEventListener('click', function() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = 8.5;
    const tenureYears = 15;
    const monthlyInterestRate = interestRate / (12 * 100);
    const totalMonths = tenureYears * 12;
    const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

    document.getElementById('emi').value = emi.toFixed(2);
    document.getElementById('submitButton').style.display = 'block';
});

document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const panInput = document.getElementById('pan');
    const loanAmountInput = document.getElementById('loanAmount');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const panError = document.getElementById('panError');
    const loanAmountError = document.getElementById('loanAmountError');
    const emiInput = document.getElementById('emi');


    // I have performed form Validation here which includes name, email, pan and loan amount. For otp i have created simple function generateRandomNumber which do not require any library.

    function validateForm() {
        let isValid = true;

        // Full Name Validation
        const fullNamePattern = /^[a-zA-Z ]{4,}(?: [a-zA-Z]{4,})+$/;
        if (!fullNamePattern.test(fullNameInput.value)) {
            fullNameError.textContent = "Full Name must have at least two words, each with a minimum of 4 characters.";
            isValid = false;
        } else {
            fullNameError.textContent = "";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Invalid email format.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panPattern.test(panInput.value)) {
            panError.textContent = "PAN must be in the format: ABCDE1234F";
            isValid = false;
        } else {
            panError.textContent = "";
        }

        if (isNaN(loanAmountInput.value) || loanAmountInput.value <= 0 || loanAmountInput.value.length > 9) {
            loanAmountError.textContent = "Loan amount must be a number greater than 0 and less than 10 digits.";
            isValid = false;
        } else {
            loanAmountError.textContent = "";
        }

        return isValid;
    }

    if (validateForm()) {
        const demoOTP = generateRandomNumber();
        const firstName = fullNameInput.value.split(' ')[0];
        const email = emailInput.value;
        const url = `confirm.html?firstName=${firstName}&email=${email}&loanAmount=${loanAmountInput.value}&otp=${demoOTP}`;
        window.location.href = url;
    }
});

function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}