document.addEventListener("DOMContentLoaded", function() {
    // Function to generate random values for the problem description
    function generateNewProblem() {
        var totalEmployees = getRandomNumber(250, 400, 10);
        var employeesLeft = getRandomNumber(10, 30, 10);
        var marketingEmployees = getRandomNumber(40, 70, 10);
        var operationsEmployees = getRandomNumber(80, 120, 10);
        var researchEmployees = getRandomNumber(120, 180, 10);
        var marketingLeft = Math.floor(marketingEmployees * 0.1);
        var operationsLeft = Math.floor(operationsEmployees * 0.1);
        var researchLeft = Math.floor(researchEmployees * 0.1);

        updateProblemDescription(totalEmployees, employeesLeft, marketingEmployees, operationsEmployees, researchEmployees, marketingLeft, operationsLeft, researchLeft);
    }

    // Update the DOM elements with the new problem description
    function updateProblemDescription(total, left, marketing, operations, research, marketingLeft, operationsLeft, researchLeft) {
        document.getElementById('totalEmployees').textContent = total;
        document.getElementById('employeesLeft').textContent = left;
        document.getElementById('marketingEmployees').textContent = marketing;
        document.getElementById('marketingLeft').textContent = marketingLeft;
        document.getElementById('operationsEmployees').textContent = operations;
        document.getElementById('operationsLeft').textContent = operationsLeft;
        document.getElementById('researchEmployees').textContent = research;
        document.getElementById('researchLeft').textContent = researchLeft;
    }

    function submitAnswer() {
        var retentionRateAnswer = document.getElementById('retentionRate').value.trim();
        var retentionAnalysisAnswer = document.getElementById('retentionAnalysis').value.trim();
    
        // Normalize input to handle "90", "90.00", or "90%"
        retentionRateAnswer = normalizeInput(retentionRateAnswer);
        retentionAnalysisAnswer = normalizeInput(retentionAnalysisAnswer);
    
        var totalEmployees = parseInt(document.getElementById('totalEmployees').textContent);
        var employeesLeft = parseInt(document.getElementById('employeesLeft').textContent);
        var researchEmployees = parseInt(document.getElementById('researchEmployees').textContent);
        var researchLeft = parseInt(document.getElementById('researchLeft').textContent);
    
        var correctRetentionRate = calculateRetentionRate(totalEmployees, employeesLeft);
        var correctResearchRetention = calculateRetentionRate(researchEmployees, researchLeft);
    
        // Update feedback for retention rate
    // Update feedback for retention rate
    document.getElementById('retentionRateFeedback').innerHTML = (retentionRateAnswer === correctRetentionRate) 
        ? '<strong style="color: green;">Correct</strong>' 
        : '<strong style="color: red;">Incorrect</strong>';

    // Update feedback for department retention analysis
    document.getElementById('retentionAnalysisFeedback').innerHTML = (retentionAnalysisAnswer === correctResearchRetention) 
        ? '<strong style="color: green;">Correct</strong>' 
        : '<strong style="color: red;">Incorrect</strong>';

        if (retentionRateAnswer === correctRetentionRate && retentionAnalysisAnswer === correctResearchRetention) {
            document.getElementById('feedback').innerHTML = '<span class="correct">All answers are Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
        } else {
            document.getElementById('feedback').innerHTML = '<span class="incorrect">Some answers are incorrect. Please try again.</span>';
        }
    }
    
    // Function to normalize the input to handle different formats
    function normalizeInput(input) {
        if (input.endsWith('%')) {
            input = input.slice(0, -1); // Remove the '%' character
        }
        return parseFloat(input).toFixed(2); // Convert to float and format to two decimal places
    }
    
    // Calculate retention rate
    function calculateRetentionRate(total, left) {
        return ((total - left) / total * 100).toFixed(2); // Rounded to two decimal places
    }
    

// Show detailed explanation in a modal
function showExplanation() {
    var totalEmployees = parseInt(document.getElementById('totalEmployees').textContent);
    var employeesLeft = parseInt(document.getElementById('employeesLeft').textContent);
    var researchEmployees = parseInt(document.getElementById('researchEmployees').textContent);
    var researchLeft = parseInt(document.getElementById('researchLeft').textContent);

    var overallRetentionRate = calculateRetentionRate(totalEmployees, employeesLeft);
    var researchDepartmentRetentionRate = calculateRetentionRate(researchEmployees, researchLeft);

    var modal = document.getElementById('explanationModal');
    modal.querySelector('.content-box').innerHTML = `
        <h2 class="blue-text">Detailed Explanation:</h2>
        <h3>Annual Retention Rate Calculation:</h3>
        <p>The annual retention rate is calculated by subtracting the number of employees who left during the year from the total number at the beginning of the year, then dividing by the total number at the start of the year, and multiplying by 100 to get a percentage.</p>
        <p>Formula: <strong>Retention Rate = [(Total Employees at Start - Employees Left) / Total Employees at Start] * 100</strong></p>
        <p>For this scenario: Retention Rate = [(${totalEmployees} - ${employeesLeft}) / ${totalEmployees}] * 100 =<span class="correct"> ${overallRetentionRate}%</span></p>
        
        <h3>Retention Rate by Department:</h3>
        <p>For the Research and Development department, the retention rate is calculated similarly by considering the number of employees who left the department against the total at the beginning of the year.</p>
        <p>Formula: <strong>Retention Rate by Department = [(Total Department Employees at Start - Department Employees Left) / Total Department Employees at Start] * 100</strong></p>
        <p>For Research and Development: Retention Rate = [(${researchEmployees} - ${researchLeft}) / ${researchEmployees}] * 100 = <span class="correct">${researchDepartmentRetentionRate}%</span></p>
    `;
    modal.style.display = 'block';
}



    // Event listeners for modal close
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    // Clear inputs and feedback
    function tryAgain() {
        document.getElementById('retentionRate').value = '';
        document.getElementById('retentionAnalysis').value = '';
        document.getElementById('retentionRateFeedback').textContent = '';
        document.getElementById('retentionAnalysisFeedback').textContent = '';
        document.getElementById('feedback').innerHTML = '';
    }

    // Generate random numbers in specified range and step
    function getRandomNumber(min, max, step) {
        return Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
    }

    // Event listeners for buttons
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnExplain').addEventListener('click', showExplanation);
    document.getElementById('btnTryAgain').addEventListener('click', tryAgain);
    document.getElementById('btnNext').addEventListener('click', generateNewProblem);

    // Initial call to set up the first problem
    generateNewProblem();
});
