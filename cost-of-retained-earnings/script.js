document.addEventListener("DOMContentLoaded", function() {
    var cost_of_equity = 0.15;
    var tax_rate = 0.40;
    var brokerage_cost = 0.02;
    
    // Function to calculate the cost of retained earnings
    function calculateCostOfRetainedEarnings() {
        var after_tax_cost_of_equity = cost_of_equity * (1 - tax_rate);
        var cost_of_retained_earnings = after_tax_cost_of_equity + brokerage_cost;
        return cost_of_retained_earnings * 100;  // Return as percentage
    }
    
    // Function to handle the submit action
    function submitAnswer() {
        var userAnswer = parseFloat(document.getElementById("answer").value);
        var correctAnswer = calculateCostOfRetainedEarnings();
        var feedback = document.getElementById("feedback");
    
        if (userAnswer.toFixed(2) === correctAnswer.toFixed(2)) {
            feedback.innerHTML = '<span style="color: green; font-weight: bold; font-size: 24px;">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.';
        } else {
            feedback.innerHTML = '<span style="color: red; font-size: 24px; font-weight: bold;">Incorrect, try again.';
            // Hide the explanation section since the answer is incorrect
            document.getElementById("explanation").style.display = "none";
        }
    }
    
    
    // Function to clear the answer and feedback, essentially resetting the problem
    function tryAgain() {
        document.getElementById("answer").value = "";
        document.getElementById("feedback").textContent = "";
        document.getElementById("explanation").textContent = "";
        document.getElementById("explanation").style.display = "none";
    }
    function explain() {
        var after_tax_cost_of_equity = cost_of_equity * (1 - tax_rate);
        
        var explanationText = "To calculate the cost of retained earnings, follow these steps:<br/><br/>";
        explanationText += "Step 1: Calculate After-tax Cost of Equity<br/>";
        explanationText += "After-tax Cost of Equity = Cost of Equity * (1 - Tax Rate)<br/>";
        explanationText += "After-tax Cost of Equity = " + cost_of_equity + " * (1 - " + tax_rate + ")<br/>";
        explanationText += "After-tax Cost of Equity = " + after_tax_cost_of_equity.toFixed(2) + "<br/><br/>";
        
        explanationText += "Step 2: Calculate Cost of Retained Earnings<br/>";
        explanationText += "Cost of Retained Earnings = After-tax Cost of Equity + Brokerage Cost<br/>";
        explanationText += "Cost of Retained Earnings = " + after_tax_cost_of_equity.toFixed(2) + " + " + brokerage_cost + "<br/>";
        explanationText += "Cost of Retained Earnings =<span class=\"correct\"> " + calculateCostOfRetainedEarnings().toFixed(2) + "%";
    
        // Use the correct selector for the explanation modal
        document.querySelector('#explanationModal .content-box').innerHTML = explanationText;
    
        // Ensure the modal is displayed
        const explanationModal = document.getElementById('explanationModal');
        explanationModal.style.display = 'block';
    }
    // Function to generate a new problem
    function nextProblem() {
        cost_of_equity = Math.random() * 0.20; // Random cost of equity from 0% to 20%
        tax_rate = Math.random() * 0.40; // Random tax rate from 0% to 40%
        brokerage_cost = Math.random() * 0.05; // Random brokerage cost from 0% to 5%
        
        // Update the problem description text
        var problemText = "A firm’s Cost of Equity (return available to shareholders) is " +
                          (cost_of_equity * 100).toFixed(2) + "%, the average tax rate of shareholders is " +
                          (tax_rate * 100).toFixed(2) + "% and it is expected that " +
                          (brokerage_cost * 100).toFixed(2) + "% is the brokerage cost that shareholders will have to pay while investing their dividends in alternative securities. What is the cost of retained earnings?";
        document.querySelector("#problem-description .content-box").innerHTML = problemText;
        
        // Reset the answer input field and feedback
        tryAgain();
    }
        function hideExplanation() {
        const explanationModal = document.getElementById('explanationModal');
        explanationModal.style.display = 'none';
    }
 
    document.querySelector('.modal .close').addEventListener('click', hideExplanation);

    // Attach event listeners to buttons
    document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", explain);
    document.getElementById("btnNext").addEventListener("click", nextProblem);
});
