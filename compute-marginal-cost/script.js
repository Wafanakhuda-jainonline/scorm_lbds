document.addEventListener("DOMContentLoaded", function() {
    var companyNames = ["Arnav Ltd.", "BCD Inc.", "XYZ Corp.", "Alpha Co."];
    var correctAnswer = "";

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function calculateMarginalCost(materialTotal, laborTotal, overheadsTotal, units) {
        var totalVariableCosts = materialTotal + laborTotal + overheadsTotal;
        return (totalVariableCosts / units).toFixed(2);
    }

    function updateProblemDescription() {
        var units = getRandomNumber(5000, 20000);
        var materialCostPerUnit = getRandomNumber(5, 15);
        var laborCostPerUnit = getRandomNumber(5, 15);
        var overheadsCostPerUnit = getRandomNumber(1, 5);
        var materialTotal = units * materialCostPerUnit;
        var laborTotal = units * laborCostPerUnit;
        var overheadsTotal = units * overheadsCostPerUnit;
        var totalCost = materialTotal + laborTotal + overheadsTotal + getRandomNumber(100000, 200000); // Including fixed cost

        document.getElementById("company-name").textContent = companyNames[Math.floor(Math.random() * companyNames.length)];
        document.getElementById("units").textContent = units.toLocaleString();
        document.getElementById("total-cost").textContent = totalCost.toLocaleString();
        document.getElementById("material-cost").textContent = materialCostPerUnit.toLocaleString();
        document.getElementById("material-total").textContent = materialTotal.toLocaleString();
        document.getElementById("labor-cost").textContent = laborCostPerUnit.toLocaleString();
        document.getElementById("labor-total").textContent = laborTotal.toLocaleString();
        document.getElementById("overheads-cost").textContent = overheadsCostPerUnit.toLocaleString();
        document.getElementById("overheads-total").textContent = overheadsTotal.toLocaleString();
        correctAnswer = calculateMarginalCost(materialTotal, laborTotal, overheadsTotal, units);
    }

    function checkAnswer() {
        var userAnswer = parseFloat(document.getElementById('answer').value);
        var feedback = document.getElementById('feedback');
        if(userAnswer.toFixed(2) === correctAnswer) {
            feedback.innerHTML = "<span class='correct'>Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>";
            feedback.className = "feedback correct";
        } else {
            feedback.innerHTML = "<span class='incorrect'>Incorrect, try again.</span>";
            feedback.className = "feedback incorrect";
        }
    }

    function tryAgain() {
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerHTML = '';
    }

    function explain() {
        var modal = document.getElementById("explanationModal");
        var modalContent = modal.querySelector('.content-box');
        var explanationText = "<strong>Detailed Explanation:</strong><br>" +
            "The marginal cost is calculated based on the total variable costs and the number of units produced.<br><br>" +
            "In this case, the total variable costs are the sum of:<br>" + 
            "- Direct Material: ₹" + document.getElementById("material-total").textContent + "<br>" + 
            "- Direct Labor: ₹" + document.getElementById("labor-total").textContent + "<br>" + 
            "- Variable Overheads: ₹" + document.getElementById("overheads-total").textContent + "<br><br>" + 
            "These costs are divided by the number of units produced (" + document.getElementById("units").textContent + 
            ") to calculate the marginal cost per unit.<br><br>" + 
            "<strong>Marginal Cost: <span style='color: green; font-weight: bold;'>₹" + correctAnswer + "</span></strong>"; 
    
        modalContent.innerHTML = explanationText;
        modal.style.display = 'block';
    }
    

    function nextProblem() {
        updateProblemDescription();
        tryAgain();
    }

    // Event Listeners
    document.getElementById("btnSubmit").addEventListener("click", checkAnswer);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", explain);
    document.getElementById("btnNext").addEventListener("click", nextProblem);

    // Close Modal Function
    document.querySelector('.modal .close').addEventListener('click', function() {
        var modal = document.getElementById("explanationModal");
        modal.style.display = "none";
    });

    // Load the first problem on page load
    updateProblemDescription();
});
