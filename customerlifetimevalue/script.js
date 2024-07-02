document.addEventListener('DOMContentLoaded', function() {
    const problems = [
        { companyname: "ABC Electronics", averagePurchaseValue: 200, averagePurchasesPerYear: 2, customerRetentionRate: 80 },
        { companyname: "XYZ Tech", averagePurchaseValue: 300, averagePurchasesPerYear: 1, customerRetentionRate: 70 },
        { companyname: "TechGuru Inc.", averagePurchaseValue: 250, averagePurchasesPerYear: 3, customerRetentionRate: 75 },
        { companyname: "Gadget World", averagePurchaseValue: 350, averagePurchasesPerYear: 2, customerRetentionRate: 85 }
    ];
    let currentProblemIndex = 0;

    function calculateCLV(problem) {
        const churnRate = 100 - problem.customerRetentionRate;
        const clv = (problem.averagePurchaseValue * problem.averagePurchasesPerYear) / (churnRate / 100);
        return clv.toFixed(2); // Rounded to 2 decimal places for simplicity
    }

    function updateProblemDescription() {
        const currentProblem = problems[currentProblemIndex];
        const problemDescriptionText = `${currentProblem.companyname} is an e-commerce company selling consumer electronics. The company is interested in calculating the Customer Lifetime Value (CLV) for its new product line, Smart Home Devices.
        The average purchase value for a smart home device is $${currentProblem.averagePurchaseValue}, and the average number of purchases per year per customer is ${currentProblem.averagePurchasesPerYear}. The average customer retention rate is ${currentProblem.customerRetentionRate}%, meaning ${100 - currentProblem.customerRetentionRate}% of customers churn each year. Calculate the Customer Lifetime Value (CLV).`;
        document.getElementById('Problem-Description').innerHTML = problemDescriptionText;
    }

    function submitAnswer() {
        var userInput = parseFloat(document.getElementById("answer").value.trim());
        var correctAnswer = parseFloat(calculateCLV(problems[currentProblemIndex]));
        
        var feedbackElement = document.getElementById("feedback");
        feedbackElement.innerHTML = ""; 
        
        if (parseFloat(userInput) === parseFloat(correctAnswer)) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    }

    function tryAgain() {
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerHTML = '';
    }

    function explain() {
        const currentProblem = problems[currentProblemIndex];
        const clv = calculateCLV(currentProblem);
        var explanation = `<h1 class="title">Explanation</h1>
                       <p>To calculate the Customer Lifetime Value (CLV), we use the formula: CLV = (Average Purchase Value * Average Number of Purchases per Year) / (Churn Rate / 100).</p>
                       <p>Given: Average Purchase Value = $${currentProblem.averagePurchaseValue}, Average Purchases per Year = ${currentProblem.averagePurchasesPerYear}, Customer Retention Rate = ${currentProblem.customerRetentionRate}% (hence Churn Rate = ${100 - currentProblem.customerRetentionRate}%).</p>
                       <p>Therefore, CLV = ($${currentProblem.averagePurchaseValue} * ${currentProblem.averagePurchasesPerYear}) / (${100 - currentProblem.customerRetentionRate} / 100) = <span class="correct">$${clv}</span>.</p>
                       <p>This represents the customer's value to the business over the lifetime of their relationship.</p>`;
    
        document.querySelector('#explanationModal .content-box').innerHTML = explanation;
        document.getElementById('explanationModal').style.display = 'block';
    }

    function next() {
        currentProblemIndex = (currentProblemIndex + 1) % problems.length;
        updateProblemDescription();
        tryAgain(); // Reset input and feedback
    }

    // Initialize problem description on load
    updateProblemDescription();

    // Event listeners for buttons
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnTryAgain').addEventListener('click', tryAgain);
    document.getElementById('btnExplain').addEventListener('click', explain);
    document.getElementById('btnNext').addEventListener('click', next);

    // Close modal logic
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('explanationModal')) {
            document.getElementById('explanationModal').style.display = "none";
        }
    });
});
