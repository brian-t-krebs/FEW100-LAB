
import './styles.css';
// Set Initial Constants
const defaultTip = '20';


const defaultAmt = 0.0;
// Get Stuff
const radioButtons: HTMLInputElement[] = [
    document.getElementById('10') as HTMLInputElement,
    document.getElementById('15') as HTMLInputElement,
    document.getElementById('20') as HTMLInputElement
];
const moneySpentEntered = document.getElementById('billAmount') as HTMLInputElement;

const spanbillAmount = document.getElementById('li-billAmount') as HTMLInputElement;
const spantipPercentage = document.getElementById('li-tipPercentage') as HTMLInputElement;
const spanamountOfTip = document.getElementById('li-amountOfTip') as HTMLInputElement;
const spantotalToBePaid = document.getElementById('li-totalToBePaid') as HTMLInputElement;

document.getElementById('percentTip').innerHTML = (defaultTip.toString() + '%');
document.getElementById('li-tipPercentage').innerHTML = (defaultTip.toString());
document.getElementById('billAmount').innerText = (defaultTip.toString());

let currentRate = 20;
// Calculate the Tip itself by listening to the input, for each keystroke // we will repaint after each keystroke.
// validate it is a currency number too!


////////////////////////////////// UPDATE AMOUNTS DISPLAYED AND DO MATH //////////////////////////////////////

// Event Handler!! for keystrokes on input field
moneySpentEntered.addEventListener('keyup', processUpdatedBillAmount);

// Update Bill Amount Function
function processUpdatedBillAmount() {
    // Set Bill Amount.
    // yeah, if it's emptied, make sure we show zeros.
    if (moneySpentEntered.value === '') {
        spanbillAmount.innerText = '0.00';
        spanamountOfTip.innerText = '0.00';
        spantotalToBePaid.innerText = '0.00';
    } else {
        const amountText = moneySpentEntered.value;
        const amount = parseFloat(moneySpentEntered.value);
        // Calc Amt of bill
        const bill = (amount < 0) ? 0.0 : amount;
        spanbillAmount.innerText = bill.toFixed(2);
        // Calc Amt. of tip using currentRate
        const tip = bill * currentRate / 100.0;
        spanamountOfTip.innerText = tip.toFixed(2);
        // calc and update total
        const totalToBePaid = bill + tip;
        spantotalToBePaid.innerText = totalToBePaid.toFixed(2);
    }
}

////////////////////////////////// RADIO BUTTON SECTION //////////////////////////////////////
// Update Tip Radio Buttons
updateTipAmt(defaultTip);

// Event Handler for Radio Buttons
radioButtons.forEach(btn => btn.addEventListener('click', handleTipClick));

function handleTipClick() {
    const radioButtonId = this.id;
    updateTipAmt(radioButtonId);
    // Update Displays
    document.getElementById('percentTip').innerHTML = (radioButtonId.toString() + '%');
    document.getElementById('li-tipPercentage').innerHTML = (radioButtonId.toString());
}

// Function for Updating Radio Buttons
function updateTipAmt(selectedRadioButton: string) {
    switch (selectedRadioButton) {
        case '10': {
            // Update the Radio Button
            document.getElementById(selectedRadioButton).setAttribute('checked', '');
            document.getElementById('15').removeAttribute('checked');
            document.getElementById('20').removeAttribute('checked');
            if (!document.getElementById('lbl' + selectedRadioButton.toString()).classList.contains('active') === true) {
            document.getElementById('lbl' + selectedRadioButton.toString()).classList.add('active');
            }
            document.getElementById('lbl15').classList.remove('active');
            document.getElementById('lbl20').classList.remove('active');
            currentRate = 10;
            processUpdatedBillAmount();
            break;
        }
        case '15': {
            // Update the Radio Button
            document.getElementById(selectedRadioButton).setAttribute('checked', '');
            document.getElementById('10').removeAttribute('checked');
            document.getElementById('20').removeAttribute('checked');
            // Update te Visual Button
            if (!document.getElementById('lbl' + selectedRadioButton.toString()).classList.contains('active') === true) {
                document.getElementById('lbl' + selectedRadioButton.toString()).classList.add('active');
            }
            document.getElementById('lbl10').classList.remove('active');
            document.getElementById('lbl20').classList.remove('active');
            currentRate = 15;
            processUpdatedBillAmount();
            break;
        }
        case '20': {
            // Update the Radio Button
            document.getElementById(selectedRadioButton).setAttribute('checked', '');
            document.getElementById('10').removeAttribute('checked');
            document.getElementById('15').removeAttribute('checked');
            // Update Visual Button via List Item
            if (!document.getElementById('lbl' + selectedRadioButton.toString()).classList.contains('active') === true) {
                document.getElementById('lbl' + selectedRadioButton.toString()).classList.add('active');
            }
            document.getElementById('lbl10').classList.remove('active');
            document.getElementById('lbl15').classList.remove('active');
            currentRate = 20;
            processUpdatedBillAmount();
            break;
            }
        default: {
            break;
        }
    }
}
