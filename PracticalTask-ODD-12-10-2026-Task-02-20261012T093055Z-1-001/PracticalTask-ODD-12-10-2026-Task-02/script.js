function calculateOrder() {
    const unitPrice = Number(document.getElementById("unitPrice").value);
    const quantity = Number(document.getElementById("quantity").value);
    const customerType = document.getElementById("customerType").value;

    const resultElement = document.getElementById("result");
    const breakdownElement = document.getElementById("breakdown");

    // Validate the input values.
    if (
        !Number.isFinite(unitPrice) ||
        unitPrice < 1 ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        resultElement.textContent =
            "Please enter a price of at least ₹1 and a whole-number quantity from 1 to 10.";
        breakdownElement.textContent =
            "The breakdown will appear after valid inputs are entered.";
        return;
    }

    // Calculate subtotal, discount, service charge, and payable amount.
    const subtotal = unitPrice * quantity;
    const rate = getRate(customerType);
    const discount = calculateDiscount(subtotal, rate);
    const serviceCharge = subtotal * 0.05;
    const payable = calculateTotal(subtotal, discount, serviceCharge);

    // Display the calculated result.
    resultElement.textContent =
        "Subtotal: ₹" + formatAmount(subtotal) +
        " | Discount: ₹" + formatAmount(discount) +
        " | Service: ₹" + formatAmount(serviceCharge) +
        " | Payable: ₹" + formatAmount(payable);

    breakdownElement.textContent =
        "Customer type: " + customerType +
        "\nDiscount rate: " + rate + "%" +
        "\n\n" + buildBreakdown(unitPrice, quantity) +
        "\n\nSubtotal: ₹" + formatAmount(subtotal) +
        "\nDiscount: ₹" + formatAmount(discount) +
        "\nService charge (5%): ₹" + formatAmount(serviceCharge) +
        "\nPayable amount: ₹" + formatAmount(payable);
}

// Format amounts to two decimal places when needed.
function formatAmount(amount) {
    return Number(amount.toFixed(2)).toString();
}

// M6: Calculate the discount from the amount and percentage.
function calculateDiscount(amount, percentage) {
    return amount * percentage / 100;
}

// D1: Return the discount rate for each customer type.
function getRate(type) {
    if (type === "Student") {
        return 10;
    } else if (type === "Staff") {
        return 5;
    } else {
        return 0;
    }
}

// D2: Calculate the final payable amount.
function calculateTotal(subtotal, discount, serviceCharge) {
    return subtotal - discount + serviceCharge;
}

// D3: Display the running cost for each item using a for loop.
function buildBreakdown(unitPrice, quantity) {
    let breakdown = "Running item-cost summary:\n";

    for (let item = 1; item <= quantity; item++) {
        const runningCost = unitPrice * item;
        breakdown +=
            "After item " + item +
            ": ₹" + formatAmount(runningCost) + "\n";
    }

    return breakdown.trimEnd();
}