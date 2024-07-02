document.addEventListener("DOMContentLoaded", function() {

    // Define the initial problem
    let currentProblem = {
        description: "The next expected Dividend per share is Rs 2.00. The Dividend per share is expected to grow at the rate of 12 percent. The market price per share is Rs.50.00. Preference stock is currently selling for Rs.85.00 per share. The tax rate for the company is 30 Percent.",
        tableData: [
            ["1", "Equity Share Capital (20,000 Shares, Rs.10 Par)", "200,000"],
            ["2", "12% Preference share Capital (500 shares, Rs.100 par)", "50,000"],
            ["3", "Retained Earnings", "35,000"],
            ["4", "13% Term Loans", "80,000"]
        ],
        correctAnswers: {
            costOfEquity: 0.16,
            costOfPrefShares: 0.1412,
            costOfDebt: 0.091,
            costOfRetained: 0.16,
            wacc: 0.1422
        },   givenValues: {
            D1: 2.00,
            g: 12,
            P0: 50.00,
            Dp: 12.00,
            Pp: 85.00,
            r: 13,
            Tc: 30,
            weights: {
                equity: 0.4,
                preference: 0.1,
                debt: 0.2,
                retained: 0.3
            }
        },
        correctAnswers: {
            costOfEquity: 0.16,
            costOfPrefShares: 0.1412,
            costOfDebt: 0.091,
            costOfRetained: 0.16,
            wacc: 0.1422
        }
    };

    // Function to load the current problem into the page
    function loadProblem(problem) {
        document.getElementById('problemDesc').textContent = problem.description;
        const table = document.getElementById('problemTable');
        table.innerHTML = '<tr><th>Sl. No</th><th>Source</th><th>Amount</th></tr>';
        problem.tableData.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    // Function to generate random values within a given range
    function randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to calculate Cost of Equity
    function calculateCostOfEquity(dividend, growthRate, marketPrice) {
        return (dividend / marketPrice) + growthRate;
    }

    // Function to calculate Cost of Preference Shares
    function calculateCostOfPrefShares(dividend, marketPrice) {
        return dividend / marketPrice;
    }

    // Function to calculate Cost of Debt
    function calculateCostOfDebt(interestRate, taxRate) {
        return interestRate * (1 - taxRate);
    }

    // Function to calculate WACC (simplified for this example)
    function calculateWACC(costOfEquity, costOfPrefShares, costOfDebt, weights) {
        return (costOfEquity * weights.equity) + (costOfPrefShares * weights.preference) + (costOfDebt * weights.debt);
    }

    // Function to generate explanation content based on the current problem's correct answers
    function generateExplanationContent() {
        const { costOfEquity, costOfPrefShares, costOfDebt, costOfRetained, wacc } = currentProblem.correctAnswers;
        const { D1, P0, g, Dp, Pp, r, Tc, weights } = currentProblem.givenValues; // Assume this object exists and is updated with each problem

        return `
            <h4 class="blue-bold">How to Solve the Problem...</h4>
            <table class="explanation-table">
            <tr>
                <td>1. Cost of Equity:</td>
                <td>Ke = (D1/P0) + g</td>
                <td>Given D1 = Rs ${D1}, P0 = Rs.${P0}, and g = ${g}%.</td>
                <td>Therefore, Ke =<span style="color: green; font-weight: bold;"> ${(costOfEquity * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>2. Cost of Preference Shares:</td>
                <td>Kp = Dp/Pp</td>
                <td>Given Dp = ${Dp}% of Rs.100 = Rs ${Dp} and Pp = Rs.${Pp}.</td>
                <td>Therefore, Kp = <span style="color: green; font-weight: bold;">${(costOfPrefShares * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>3. Cost of Debt:</td>
                <td>Kd = r * (1 - Tc)</td>
                <td>Given r = ${r}% and Tc = ${Tc}%.</td>
                <td>Therefore, Kd = <span style="color: green; font-weight: bold;">${(costOfDebt * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>4. Cost of Retained Earnings:</td>
                <td>Kr = Ke</td>
                <td>Typically the same as the cost of equity.</td>
                <td>Therefore, Kr =<span style="color: green; font-weight: bold;"> ${(costOfRetained * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>5. Weighted Average Cost of Capital (WACC):</td>
                <td>WACC = (Wke * Ke) + (Wkp * Kp) + (Wkd * Kd) + (Wkr * Kr)</td>
                <td>Given weights are equity: ${weights.equity * 100}%, preference: ${weights.preference * 100}%, debt: ${weights.debt * 100}%, retained: ${weights.retained * 100}%.</td>
                <td>Therefore, WACC = <span style="color: green; font-weight: bold;">${(wacc * 100).toFixed(2)}%</td>
            </tr>
        </table>
        `;
    }


    function submitAnswer() {
        let isAllAnswersCorrect = true;
    
        // Define the answer keys and the corresponding elements for feedback
        const answerKeys = ['costOfEquity', 'costOfPrefShares', 'costOfDebt', 'costOfRetained', 'wacc'];
        const feedbackIds = {
            costOfEquity: 'costOfEquityFeedback',
            costOfPrefShares: 'costOfPreferenceFeedback',
            costOfDebt: 'costOfDebtFeedback',
            costOfRetained: 'costOfRetainedEarnFeedback',
            wacc: 'costOfwaccFeedback'
        };
    
        answerKeys.forEach(key => {
            const userInput = document.getElementById(key).value.trim();
            const correctValue = currentProblem.correctAnswers[key];
            let numericInput = parseFloat(userInput.endsWith("%") ? userInput.replace('%', '') : userInput) / (userInput.endsWith("%") ? 100 : 1);
            const isIndividualCorrect = numericInput.toFixed(4) === correctValue.toFixed(4);
    
            // Display individual feedback for each answer
            displayIndividualFeedback(feedbackIds[key], isIndividualCorrect);
    
            // If any one answer is wrong, set isAllAnswersCorrect to false
            if (!isIndividualCorrect) {
                isAllAnswersCorrect = false;
            }
        });
    
        // Display overall feedback based on all answers
        displayOverallFeedback(isAllAnswersCorrect);
        hideExplanation();
    }
    
    function displayIndividualFeedback(elementId, isCorrect) {
        const feedbackElement = document.getElementById(elementId);
        feedbackElement.textContent = isCorrect ? 'Correct' : 'Incorrect';
        feedbackElement.style.color = isCorrect ? 'green' : 'red';
        
    }
    
    function displayOverallFeedback(isAllCorrect) {
        const feedbackElement = document.getElementById('overallFeedback'); // Add this element to your HTML
        feedbackElement.textContent = isAllCorrect ? 'All answers are correct!' : 'Some answers are incorrect.';
        feedbackElement.style.color = isAllCorrect ? 'green' : 'red';
        feedbackElement.style.fontWeight = 'bold';
        feedbackElement.style.fontSize = '1.5em';
    }
    
    function clearFields() {
        const fields = ['costOfEquity', 'costOfPrefShares', 'costOfDebt', 'costOfRetained', 'wacc'];
        fields.forEach(id => {
            document.getElementById(id).value = '';
            // Clear individual feedback as well
            const feedbackElement = document.getElementById(id + 'Feedback');
            if (feedbackElement) {
                feedbackElement.textContent = '';
            }
        });
        // Clear overall feedback
        const overallFeedbackElement = document.getElementById('overallFeedback');
        if (overallFeedbackElement) {
            overallFeedbackElement.textContent = '';
        }
    }
    
    
    
    function explain() {
        const explanationModal = document.getElementById('explanationModal');
        const contentBox = explanationModal.querySelector('.content-box');
        contentBox.innerHTML = generateExplanationContent();
        explanationModal.style.display = 'block';
    }

    // Function to hide explanation
    function hideExplanation() {
        document.getElementById('explanationModal').style.display = 'none';
    }

    function nextProblem() {
        // Randomly generate new values for the problem
        let newDividend = randomInRange(1, 5);
        let newGrowthRate = randomInRange(10, 15) / 100;
        let newMarketPrice = randomInRange(45, 60);
        let newPreferencePrice = randomInRange(80, 100);
        let newTaxRate = randomInRange(25, 35) / 100;

        // Update the givenValues with new data
        currentProblem.givenValues.D1 = newDividend;
        currentProblem.givenValues.g = newGrowthRate * 100; // Convert to percentage
        currentProblem.givenValues.P0 = newMarketPrice;
        currentProblem.givenValues.Pp = newPreferencePrice;
        currentProblem.givenValues.r = 13; // Assuming the interest rate doesn't change
        currentProblem.givenValues.Tc = newTaxRate * 100; // Convert to percentage

        // Update the correctAnswers with calculations based on the new givenValues
        currentProblem.correctAnswers.costOfEquity = calculateCostOfEquity(newDividend, newGrowthRate, newMarketPrice);
        currentProblem.correctAnswers.costOfPrefShares = calculateCostOfPrefShares(0.12 * 100, newPreferencePrice);
        currentProblem.correctAnswers.costOfDebt = calculateCostOfDebt(0.13, newTaxRate);
        currentProblem.correctAnswers.costOfRetained = currentProblem.correctAnswers.costOfEquity; // Assuming it's the same as cost of equity
        currentProblem.correctAnswers.wacc = calculateWACC(
            currentProblem.correctAnswers.costOfEquity,
            currentProblem.correctAnswers.costOfPrefShares,
            currentProblem.correctAnswers.costOfDebt,
            currentProblem.givenValues.weights
        );

        // Update the problem description and table data based on the new problem
        updateProblemDescriptionAndTable(newDividend, newGrowthRate, newMarketPrice, newPreferencePrice, newTaxRate);
    }

    function updateProblemDescriptionAndTable(newDividend, newGrowthRate, newMarketPrice, newPreferencePrice, newTaxRate) {
        // Update the description and table based on the new values
        currentProblem.description = `The next expected Dividend per share is Rs ${newDividend}.00. The Dividend per share is expected to grow at the rate of ${newGrowthRate * 100} percent. The market price per share is Rs.${newMarketPrice}.00. Preference stock is currently selling for Rs.${newPreferencePrice}.00 per share. The tax rate for the company is ${newTaxRate * 100} Percent.`;

        currentProblem.tableData = [
            ["1", "Equity Share Capital (20,000 Shares, Rs.10 Par)", `Rs.${randomInRange(190000, 250000)}`],
            ["2", "12% Preference share Capital (500 shares, Rs.100 par)", `Rs.${randomInRange(45000, 60000)}`],
            ["3", "Retained Earnings", `Rs.${randomInRange(30000, 50000)}`],
            ["4", "13% Term Loans", `Rs.${randomInRange(70000, 95000)}`]
        ];

        // Reload the problem with new values
        loadProblem(currentProblem);
        clearFields();
        hideExplanation();
    }

    // Event listeners for buttons
    document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
    document.getElementById("btnTryAgain").addEventListener("click", clearFields);
    document.getElementById("btnExplain").addEventListener("click", explain);
    document.getElementById("btnNext").addEventListener("click", nextProblem);
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    // Load the initial problem
    loadProblem(currentProblem);
});