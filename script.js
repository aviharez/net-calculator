// state object to hold all calculator values
const state = {
    salePrice: 5000000,
    commissionRate: 5.0,
    miscCosts: 10000,
    transferTaxEnabled: false,
    transferTaxRate: 1.5
};

// dom element refs
const elements = {
    // inputs
    salePriceSlider: document.getElementById('salePriceSlider'),
    salePriceInput: document.getElementById('salePriceInput'),
    salePriceDisplay: document.getElementById('salePriceDisplay'),
    commissionSlider: document.getElementById('commissionSlider'),
    commissionDisplay: document.getElementById('commissionDisplay'),
    miscCostsSlider: document.getElementById('miscCostsSlider'),
    miscCostsInput: document.getElementById('miscCostsInput'),
    miscCostsDisplay: document.getElementById('miscCostsDisplay'),
    transferTaxToggle: document.getElementById('transferTaxToggle'),
    
    // result
    netProceedsPercent: document.getElementById('netProceedsPercent'),
    netProceedsValue: document.getElementById('netProceedsValue'),
    totalCostsValue: document.getElementById('totalCostsValue'),
    takeHomeAmount: document.getElementById('takeHomeAmount'),
    
    // detail breakdown
    detailSalePrice: document.getElementById('detailSalePrice'),
    detailCommissionRate: document.getElementById('detailCommissionRate'),
    detailCommission: document.getElementById('detailCommission'),
    detailTransferTax: document.getElementById('detailTransferTax'),
    detailMiscCosts: document.getElementById('detailMiscCosts'),
    detailNetProceeds: document.getElementById('detailNetProceeds'),
    transferTaxRow: document.getElementById('transferTaxRow'),
    
    // chart
    netProceedsSegment: document.getElementById('netProceedsSegment'),
    costsSegment: document.getElementById('costsSegment')
};

// utility function
// format number as currency (USD)
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// format number as percentage
function formatPercent(value, decimals = 1) {
    return value.toFixed(decimals) + '%';
}

// calculate all financial values
function calculateProceeds() {
    const commission = state.salePrice * (state.commissionRate / 100);
    const transferTax = state.transferTaxEnabled ? state.salePrice * (state.transferTaxRate / 100) : 0;
    const totalCosts = commission + transferTax + state.miscCosts;
    const netProceeds = state.salePrice - totalCosts;
    const netProceedsPercent = (netProceeds / state.salePrice) * 100;
    
    return {
        commission,
        transferTax,
        totalCosts,
        netProceeds,
        netProceedsPercent
    };
}

// update donut chart
function updateDonutChart(netPercent) {
    const circumference = 2 * Math.PI * 85;
    const netDash = (netPercent / 100) * circumference;
    const costsDash = circumference - netDash;
    
    // update css custom properties for anim
    elements.netProceedsSegment.style.setProperty('--proceeds-dash', netDash);
    elements.costsSegment.style.setProperty('--costs-dash', costsDash);
    
    // set stroke dasharray to create the donut effect
    elements.netProceedsSegment.style.strokeDasharray = `${netDash} ${circumference}`;
    elements.costsSegment.style.strokeDasharray = `${costsDash} ${circumference}`;
    elements.costsSegment.style.strokeDashoffset = -netDash;
}

// update all display element with calculated values
function updateDisplay() {
    const results = calculateProceeds();
    
    // update input displays
    elements.salePriceDisplay.textContent = formatCurrency(state.salePrice);
    elements.commissionDisplay.textContent = formatPercent(state.commissionRate);
    elements.miscCostsDisplay.textContent = formatCurrency(state.miscCosts);
    
    // update results
    elements.netProceedsPercent.textContent = formatPercent(results.netProceedsPercent, 0);
    elements.netProceedsValue.textContent = formatCurrency(results.netProceeds);
    elements.totalCostsValue.textContent = formatCurrency(results.totalCosts);
    elements.takeHomeAmount.textContent = formatCurrency(results.netProceeds);

    // update detailed breakdown
    elements.detailSalePrice.textContent = formatCurrency(state.salePrice);
    elements.detailCommissionRate.textContent = state.commissionRate.toFixed(1);
    elements.detailCommission.textContent = '-' + formatCurrency(results.commission);
    elements.detailMiscCosts.textContent = '-' + formatCurrency(state.miscCosts);
    elements.detailNetProceeds.textContent = formatCurrency(results.netProceeds);

    // update transfer tax row
    if (state.transferTaxEnabled) {
        elements.transferTaxRow.style.display = 'flex';
        elements.detailTransferTax.textContent = '-' + formatCurrency(results.transferTax);
    } else {
        elements.transferTaxRow.style.display = 'none';
    }

    // update donut chart
    updateDonutChart(results.netProceedsPercent);
}

// event handlers
function initializerEventListeners() {
    // sale price handlers
    elements.salePriceSlider.addEventListener('input', (e) => {
        state.salePrice = parseInt(e.target.value);
        elements.salePriceInput.value = state.salePrice;
        updateDisplay();
    });

    elements.salePriceInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value) || 0;
        // clamp value within min/max
        value = Math.max(100000, Math.min(25000000, value));
        state.salePrice = value;
        elements.salePriceSlider.value = value;
        updateDisplay();
    });

    // commission handler
    elements.commissionSlider.addEventListener('input', (e) => {
        state.commissionRate = parseFloat(e.target.value);
        updateDisplay();
    });

    // miscellaneous costs handler
    elements.miscCostsSlider.addEventListener('input', (e) => {
        state.miscCosts = parseInt(e.target.value);
        elements.miscCostsInput.value = state.miscCosts;
        updateDisplay();
    });

    elements.miscCostsInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value) || 0;
        // clamp value within  min/max
        value = Math.max(0, Math.min(1000000, value));
        state.miscCosts = value;
        elements.miscCostsSlider.value = value;
        updateDisplay();
    });

    elements.transferTaxToggle.addEventListener('click', (e) => {
        state.transferTaxEnabled = !state.transferTaxEnabled;
        elements.transferTaxToggle.classList.toggle('active');
        elements.transferTaxToggle.setAttribute('aria-checked', state.transferTaxEnabled);
        updateDisplay();
    });

    // keyboard accessibility for toggle
    elements.transferTaxToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.transferTaxToggle.click();
        }
    });

    // prevent form submission on enter key in number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
        });
    });
}

// initialization
// initialize the calculator
function init() {
    // setup event listener
    initializerEventListeners();

    // initial display update
    updateDisplay();

    // add smooth scrolling for mobile
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    console.log('Luxury Net Proceeds Calculator initialized successfully');
}

// run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}