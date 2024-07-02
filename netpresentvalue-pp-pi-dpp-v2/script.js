document.addEventListener('DOMContentLoaded', function() {
    const npvTextbox = document.getElementById('npvTextbox');
    const paybackTextbox = document.getElementById('paybackTextbox');
    const discountedPaybackTextbox = document.getElementById('discountedPaybackTextbox');
    const feedback = document.getElementById('feedback');
    const explanationModal = document.getElementById('explanationModal');
    const explanationContent = explanationModal.querySelector('.content-box');
    const btnClose = explanationModal.querySelector('.close');
    const problemDescription = document.getElementById('Problem-Description');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnExplain = document.getElementById('btnExplain');
    const btnNext = document.getElementById('btnNext');
    const btnTryAgain = document.getElementById('btnTryAgain');

    // Shared state for updated values
    let state = {
      initialInvestment: 500000,
      cashFlows: [150000, 200000, 250000, 300000, 350000],
      discountRate: 0.10
    };
  
    btnClose.addEventListener('click', function() {
      explanationModal.style.display = 'none';
    });
  
    btnSubmit.addEventListener('click', function() {
      let userNpv = parseFloat(npvTextbox.value);
      let userPayback = parseFloat(paybackTextbox.value);
      let userDiscountedPayback = parseFloat(discountedPaybackTextbox.value);
  
      let correctNpv = calculateNPV(state.initialInvestment, state.cashFlows, state.discountRate);
      let correctPayback = calculatePaybackPeriod(state.initialInvestment, state.cashFlows);
      let correctDiscountedPayback = calculateDiscountedPaybackPeriod(state.initialInvestment, state.cashFlows, state.discountRate);
  
      let isNpvCorrect = Math.abs(userNpv - correctNpv) < 1; // Allow some margin for rounding
      let isPaybackCorrect = Math.abs(userPayback - correctPayback) < 0.1; // Allow some margin for partial years
      let isDiscountedPaybackCorrect = Math.abs(userDiscountedPayback - correctDiscountedPayback) < 0.1; // Allow some margin
  
      if (isNpvCorrect && isPaybackCorrect && isDiscountedPaybackCorrect) {
        feedback.textContent = 'Correct! Great job.';
        feedback.style.color = 'green';
      } else {
        feedback.textContent = 'Incorrect, please try again.';
        feedback.style.color = 'red';
      }
    });
  

    btnSubmit.addEventListener('click', function() {
        let userNpv = parseFloat(npvTextbox.value);
        let userPayback = parseFloat(paybackTextbox.value);
        let userDiscountedPayback = parseFloat(discountedPaybackTextbox.value);

        let correctNpv = calculateNPV(state.initialInvestment, state.cashFlows, state.discountRate);
        let correctPayback = calculatePaybackPeriod(state.initialInvestment, state.cashFlows);
        let correctDiscountedPayback = calculateDiscountedPaybackPeriod(state.initialInvestment, state.cashFlows, state.discountRate);

        // Update feedback for NPV
        updateFeedback('npvFeedback', userNpv, correctNpv, 1);
        // Update feedback for Payback
        updateFeedback('paybackFeedback', userPayback, correctPayback, 0.1);
        // Update feedback for Discounted Payback
        updateFeedback('discountedPaybackFeedback', userDiscountedPayback, correctDiscountedPayback, 0.1);

        // Overall feedback
        if (document.getElementById('npvFeedback').textContent === "Correct" &&
            document.getElementById('paybackFeedback').textContent === "Correct" &&
            document.getElementById('discountedPaybackFeedback').textContent === "Correct") {
                feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
                feedback.style.color = 'green';
            } else {
                feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
                feedback.style.color = 'red';
            }
        
    });





    btnExplain.addEventListener('click', function() {
      let npvExplanation = calculateNPV(state.initialInvestment, state.cashFlows, state.discountRate, true);
      let paybackExplanation = calculatePaybackPeriod(state.initialInvestment, state.cashFlows, true);
      let discountedPaybackExplanation = calculateDiscountedPaybackPeriod(state.initialInvestment, state.cashFlows, state.discountRate, true);
  
      explanationContent.innerHTML = `${npvExplanation}<br><br>${paybackExplanation}<br><br>${discountedPaybackExplanation}`;
      explanationModal.style.display = 'block';
    });
  
  // Function to generate a new problem scenario
  function generateNewProblem() {
        const companyNames = ["ABC Corporation", "XYZ Industries", "DEF Global", "GHI Enterprises", "JKL Group"];
        const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
        state.initialInvestment = Math.floor((Math.random() * (600 - 400) + 400)) * 1000;
        state.cashFlows = Array.from({ length: 5 }, () => Math.floor((Math.random() * (350 - 100) + 100)) * 1000);
        state.discountRate = Math.round((Math.random() * 0.1 + 0.05) * 100) / 100;

        // Clear input fields and feedback
        npvTextbox.value = '';
        paybackTextbox.value = '';
        discountedPaybackTextbox.value = '';
        feedback.textContent = '';

        // Update the problem description with the new scenario
        problemDescription.textContent = `${companyName} is considering investing in a new project that requires an initial investment of $${state.initialInvestment.toLocaleString()}. The expected cash inflows for the next five years are as follows: Year 1: $${state.cashFlows[0].toLocaleString()}, Year 2: $${state.cashFlows[1].toLocaleString()}, Year 3: $${state.cashFlows[2].toLocaleString()}, Year 4: $${state.cashFlows[3].toLocaleString()}, and Year 5: $${state.cashFlows[4].toLocaleString()}. The company uses a discount rate of ${(state.discountRate * 100).toFixed(2)}%.`;
    }

    // Call generateNewProblem when the page loads
    generateNewProblem();

    // Also call generateNewProblem when the 'Next' button is clicked
    btnNext.addEventListener('click', function() {
        generateNewProblem();
    });


    btnTryAgain.addEventListener('click', function() {
        // Clear the input fields
        npvTextbox.value = '';
        paybackTextbox.value = '';
        discountedPaybackTextbox.value = '';
    
        // Clear any feedback text
        feedback.textContent = '';
    
        // Also clear individual feedback texts and reset styles
        const feedbackElements = ['npvFeedback', 'paybackFeedback', 'discountedPaybackFeedback'];
        feedbackElements.forEach(function(elementId) {
            const element = document.getElementById(elementId);
            element.textContent = ''; // Clears the text
            element.style.color = ''; // Resets any style changes made
            element.style.fontWeight = ''; // Resets font weight to default
        });
    });
    

  function calculateNPV(initialInvestment, cashFlows, discountRate, returnExplanation = false) {
    let npv = -initialInvestment;
    let detailedExplanation = `NPV Calculation Details:<br>Initial Investment: $${initialInvestment.toLocaleString()}<br>`;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow((1 + discountRate), i + 1);
        detailedExplanation += `Year ${i + 1} Cash Flow: $${cashFlows[i].toLocaleString()}, Discounted to Present Value: $${(cashFlows[i] / Math.pow((1 + discountRate), i + 1)).toFixed(2)}<br>`;
    }
    detailedExplanation += `The NPV is the sum of all these present values minus the initial investment. Calculated NPV: <span class="correct">$${npv.toFixed(2)}</span>`;

    if (returnExplanation) {
        return detailedExplanation;
    }
    return npv;
}


function calculatePaybackPeriod(initialInvestment, cashFlows, returnExplanation = false) {
    let cumulativeCashFlow = 0;
    let paybackPeriod = 0;
    let detailedExplanation = `Payback Period Calculation Details:<br>Initial Investment: $${initialInvestment.toLocaleString()}<br>`;
    for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        detailedExplanation += `Year ${i + 1} Cumulative Cash Flow: $${cumulativeCashFlow.toLocaleString()}<br>`;
        if (cumulativeCashFlow >= initialInvestment) {
            paybackPeriod = i + 1;
            detailedExplanation += `The investment is recovered in <span class="correct"> ${paybackPeriod} years.</span>`;
            break;
        }
    }
    
    if (returnExplanation) {
        return detailedExplanation;
    }
    return paybackPeriod;
}


function calculateDiscountedPaybackPeriod(initialInvestment, cashFlows, discountRate, returnExplanation = false) {
    let cumulativeDiscountedCashFlow = 0;
    let discountedPaybackPeriod = 0;
    let detailedExplanation = `Discounted Payback Period Calculation Details:<br>Initial Investment: $${initialInvestment.toLocaleString()}<br>`;
    for (let i = 0; i < cashFlows.length; i++) {
        let discountedCashFlow = cashFlows[i] / Math.pow((1 + discountRate), i + 1);
        cumulativeDiscountedCashFlow += discountedCashFlow;
        detailedExplanation += `Year ${i + 1} Discounted Cash Flow: $${discountedCashFlow.toFixed(2)}, Cumulative: $${cumulativeDiscountedCashFlow.toFixed(2)}<br>`;
        if (cumulativeDiscountedCashFlow >= initialInvestment) {
            discountedPaybackPeriod = i + 1;
            detailedExplanation += `The investment is recovered in <span class="correct">${discountedPaybackPeriod} years </span>, considering the time value of money.`;
            break;
        }
    }
    
    if (returnExplanation) {
        return detailedExplanation;
    }
    return discountedPaybackPeriod;
}
function updateFeedback(elementId, userValue, correctValue, tolerance) {
    const feedbackElement = document.getElementById(elementId);
    const isCorrect = Math.abs(userValue - correctValue) < tolerance;
    feedbackElement.textContent = isCorrect ? "Correct" : "Incorrect";
    feedbackElement.style.fontWeight = 'bold';
    feedbackElement.style.color = isCorrect ? 'green' : 'red';
}

});