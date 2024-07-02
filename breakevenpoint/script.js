document.addEventListener('DOMContentLoaded', function() {
    const bakeryNames = ["Tasty Bakery", "Sweet Treats", "Delicious Bites", "Yummy Pastries", "Heavenly Cakes"];
    var correctAnswer;
    var sellingPrice, variableCost, fixedCosts, bakeryName;

    function getRandomNumber(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateNewProblem() {
        bakeryName = getRandomNumber(bakeryNames); // Select a random bakery name
        sellingPrice = getRandomNumber([10, 20, 30, 40, 50]);
        variableCost = getRandomNumber([1, 2, 3, 4, 5]);
        fixedCosts = getRandomNumber([400, 500, 900, 300, 600]);

        correctAnswer = fixedCosts / (sellingPrice - variableCost);
        correctAnswer = parseFloat(correctAnswer.toFixed(2)); // Round the answer to two decimal places

        let problemDescription = `${bakeryName} is introducing a new cupcake flavor. The variable cost per cupcake is $${variableCost}, and the fixed costs associated with launching the new flavor amount to $${fixedCosts}. The bakery estimates that it can sell 1,000 cupcakes at a price of $${sellingPrice} per cupcake. Calculate the break-even point and determine if the bakery will make a profit.`;

        document.getElementById("Problem-Description").innerText = problemDescription;
    }

    function submitAnswer() {
        var userAnswer = parseFloat(document.getElementById("answer").value.replace(/,/g, ''));
        var feedbackElement = document.getElementById("feedback");

        // Check against both the exact value and the rounded value of the correct answer
        if (!isNaN(userAnswer) && (parseFloat(userAnswer.toFixed(2)) === correctAnswer || Math.round(userAnswer) === Math.round(correctAnswer))) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    }
    function tryAgain() {
        document.getElementById("answer").value = "";
        document.getElementById("feedback").innerText = "";
    }

    function explain() {
        document.getElementById("explanationModal").style.display = "block";
        document.querySelector('#explanationModal .content-box').innerHTML = `<h1 class="title">Explanation</h1>
            <p>1. To calculate the break-even point, we use the formula: Break-even Point = Fixed Costs / (Selling Price - Variable Cost).</p>
            <p>2. Given that ${bakeryName} has fixed costs of $${fixedCosts}, sells each cupcake for $${sellingPrice}, and incurs a variable cost of $${variableCost} per cupcake,</p>
            <p>the break-even point is determined as $${fixedCosts} / ($${sellingPrice} - $${variableCost}) = <span class="correct">${correctAnswer}</span></p>
            <p>This means ${bakeryName} needs to sell approximately ${Math.round(correctAnswer)} cupcakes to cover all costs. Since we're dealing with whole cupcakes, we round to the nearest whole number for practical purposes.</p>`;
    }
    

    function next() {
        generateNewProblem();
        tryAgain(); // Clear previous answers and feedback
    }

    // Event listeners for buttons
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnTryAgain').addEventListener('click', tryAgain);
    document.getElementById('btnExplain').addEventListener('click', explain);
    document.getElementById('btnNext').addEventListener('click', next);

    // Close modal functionality
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });
    window.onclick = function(event) {
        if (event.target == document.getElementById('explanationModal')) {
            document.getElementById('explanationModal').style.display = 'none';
        }
    };

    generateNewProblem(); // Initialize the first problem when the page loads
});