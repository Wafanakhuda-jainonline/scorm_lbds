document.addEventListener('DOMContentLoaded', function() {
    const problems = [
        [400000, 398000, 450000, 445000, 500000],
        [500000, 510000, 480000, 520000, 530000],
        [450000, 460000, 440000, 470000, 480000],
        [600000, 590000, 610000, 620000, 630000]
    ];
    let currentProblemIndex = 0;

    function calculateGoodwillofaFirm(profits) {
        const averageProfit = profits.reduce((sum, current) => sum + current, 0) / profits.length;
        const goodwill = averageProfit * 4;
        return goodwill;
    }

    function updateProblemDescription() {
        const currentProfits = problems[currentProblemIndex];
        const problemDescriptionText = `The profit for the five years of a firm are as follows – year 1 Rs. ${currentProfits[0].toLocaleString()}; year 2 Rs. ${currentProfits[1].toLocaleString()}; year 3 Rs. ${currentProfits[2].toLocaleString()}; year 4 Rs. ${currentProfits[3].toLocaleString()} and year 5 Rs. ${currentProfits[4].toLocaleString()}. Calculate goodwill of the firm on the basis of 4 years purchase of 5 years average profits.`;
        document.getElementById('Problem-Description').innerHTML = problemDescriptionText;
    }

    function submitAnswer() {
        var userInput = document.getElementById("answer").value.trim();
        // Remove commas from user input before converting to a number
        var normalizedUserInput = userInput.replace(/,/g, '');
        var correctAnswer = calculateGoodwillofaFirm(problems[currentProblemIndex]);
        
        var feedbackElement = document.getElementById("feedback");
        feedbackElement.innerHTML = ""; 
    
        // Compare normalized user input with the correct answer
        if (parseFloat(normalizedUserInput) === correctAnswer) {
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
    const currentProfits = problems[currentProblemIndex];
    const averageProfit = currentProfits.reduce((sum, profit) => sum + profit, 0) / currentProfits.length;
    const goodwill = averageProfit * 4; // Goodwill based on 4 years purchase of average profit
    
    var explanation = `<h1 class="title">Explanation</h1>
                       <p><strong>Step 1:</strong> Calculate the average profit over the last 5 years.</p>
                       <p>Average Profit = (Sum of annual profits over 5 years) / 5</p>
                       <p>For these profits: ${currentProfits.join(', ')},</p>
                       <p>Average Profit = (${currentProfits.join(' + ')}) / 5 = Rs. ${averageProfit.toLocaleString('en-IN', {maximumFractionDigits: 2})}</p>
                       <p>Average Profit = Rs. ${averageProfit.toLocaleString('en-IN', {maximumFractionDigits: 2})}.</p>
                       <p><strong>Step 2:</strong> Calculate the Goodwill based on 4 years' purchase of the average profit.</p>

                        <p>Goodwill = Rs. ${averageProfit.toLocaleString('en-IN', {maximumFractionDigits: 2})} * 4 = <span class="correct">Rs. ${goodwill.toLocaleString('en-IN', {maximumFractionDigits: 2})} </span></p>
                        <p>This represents the firm's Goodwill as four times its average annual profit.</p>`;
    
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
        var modal = document.getElementById('explanationModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
