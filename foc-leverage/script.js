document.addEventListener("DOMContentLoaded", function() {

    const originalData = [
        ['Sales', 40000],
        ['Less: variable cost', 25000],
        ['Less: Fixed cost', 6000],
        ['EBIT', 9000],
        ['Less: Interest', 3000],
        ['EBT', 6000],
        ['Less: Tax @ 30%', 1800],
        ['PAT', 4200]
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function renderTable(data) {
        const table = document.getElementById('data');
        table.innerHTML = '<tr><th>Particulars</th><th>Rs. In Cr</th></tr>';

        data.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    function generateRandomProblem() {
        const sales = getRandomInt(10000, 100000);
        const variableCost = getRandomInt(5000, sales - 2000);
        const fixedCost = getRandomInt(1000, 15000);
        const ebit = sales - variableCost - fixedCost;
        const interest = getRandomInt(500, 7000);
        const ebt = ebit - interest;
        const tax = Math.round(ebt * 0.3);
        const pat = ebt - tax;

        const randomData = [
            ['Sales', sales],
            ['Less: variable cost', variableCost],
            ['Less: Fixed cost', fixedCost],
            ['EBIT', ebit],
            ['Less: Interest', interest],
            ['EBT', ebt],
            ['Less: Tax @ 30%', tax],
            ['PAT', pat]
        ];

        renderTable(randomData);
        clearFields();
        hideExplanation();
    }

    function checkAnswers() {
        const ebit = parseInt(document.getElementById('data').rows[4].cells[1].innerText);
        const interest = parseInt(document.getElementById('data').rows[5].cells[1].innerText);
        const sales = parseInt(document.getElementById('data').rows[1].cells[1].innerText);
        const variableCost = parseInt(document.getElementById('data').rows[2].cells[1].innerText);
    
        const fl = ebit / (ebit - interest);
        const ol = (sales - variableCost) / ebit;
        const cl = fl * ol;
    
        // Get the user's answers
        const flAnswer = parseFloat(document.getElementById('finLeverage').value);
        const olAnswer = parseFloat(document.getElementById('opLeverage').value);
        const clAnswer = parseFloat(document.getElementById('combLeverage').value);
    
        // Function to set feedback
        function setFeedback(id, condition) {
            const feedbackElement = document.getElementById(id);
            if (condition) {
                feedbackElement.textContent = 'Correct';
                feedbackElement.className = 'feedback correct'; // Use class for styling
            } else {
                feedbackElement.textContent = 'Incorrect';
                feedbackElement.className = 'feedback incorrect'; // Use class for styling
            }
        }
    
        // Check each answer and set feedback
        setFeedback('finLeverageFeedback', flAnswer.toFixed(2) === fl.toFixed(2));
        setFeedback('opLeverageFeedback', olAnswer.toFixed(2) === ol.toFixed(2));
        setFeedback('combLeverageFeedback', clAnswer.toFixed(2) === cl.toFixed(2));
    
        // Determine overall feedback
        const allCorrect = flAnswer.toFixed(2) === fl.toFixed(2) &&
                            olAnswer.toFixed(2) === ol.toFixed(2) &&
                            clAnswer.toFixed(2) === cl.toFixed(2);
    
        const overallFeedback = document.getElementById('feedback');
        if (allCorrect) {
            overallFeedback.textContent = 'All answers are Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.';
            overallFeedback.className = 'feedback correct'; // Use class for styling
        } else {
            overallFeedback.textContent = 'Some answers are incorrect. You can click TRY AGAIN or EXPLAIN.';
            overallFeedback.className = 'feedback incorrect'; // Use class for styling
        }
    }
    

    function clearFields() {
        document.getElementById('finLeverage').value = '';
        document.getElementById('opLeverage').value = '';
        document.getElementById('combLeverage').value = '';
        document.getElementById('feedback').textContent = '';
        document.querySelector('.modal .content-box').innerHTML = '';
        hideExplanation();
    }

    
    function showExplanation() {
        // These values should be the actual calculations from your data
        const ebit = parseInt(document.getElementById('data').rows[4].cells[1].innerText);
        const interest = parseInt(document.getElementById('data').rows[5].cells[1].innerText);
        const sales = parseInt(document.getElementById('data').rows[1].cells[1].innerText);
        const variableCost = parseInt(document.getElementById('data').rows[2].cells[1].innerText);
    
        const fl = ebit / (ebit - interest);
        const ol = (sales - variableCost) / ebit;
        const cl = fl * ol;
    
        const explanationContent = document.querySelector('.modal .content-box');
        explanationContent.innerHTML = `
        <h4>Detailed Explanation:</h4>

        <p><strong>Step 1: Calculate Financial Leverage (FL)</strong></p>
        <p>Financial Leverage (FL) indicates the degree to which a company is using debt to finance its assets. The formula is:</p>
        <p><em>FL = EBIT / (EBIT - Interest)</em></p>
        <p>Using the provided data: FL = ${ebit} / (${ebit} - ${interest}) = <span style="color: green; font-weight: bold;">${fl.toFixed(2)}</span></p>
        
        <p><strong>Step 2: Calculate Operating Leverage (OL)</strong></p>
        <p>Operating Leverage (OL) quantifies how a percentage change in sales, above the break-even point, affects operating income. The formula is:</p>
        <p><em>OL = (Sales - Variable Cost) / EBIT</em></p>
        <p>Using the provided data: OL = (${sales} - ${variableCost}) / ${ebit} = <span style="color: green; font-weight: bold;">${ol.toFixed(2)}</span></p>
        
        <p><strong>Step 3: Calculate Combined Leverage (CL)</strong></p>
        <p>Combined Leverage (CL) reflects the sensitivity of net income to changes in sales. The formula is:</p>
        <p><em>CL = FL * OL</em></p>
        <p>Using the provided data: CL = ${fl.toFixed(2)} * ${ol.toFixed(2)} = <span style="color: green; font-weight: bold;">${cl.toFixed(2)}</span></p>
        
        <p>This comprehensive leverage analysis aids in understanding the financial risk and operating risk faced by the company.</p>
        `;
        document.getElementById('explanationModal').style.display = 'block';
    }
    
    function hideExplanation() {
        document.getElementById('explanationModal').style.display = 'none';
    }

    // Close the explanation modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', hideExplanation);

    // Load the original problem on page load
    renderTable(originalData);

    // Attach event listeners to buttons
    document.getElementById("btnSubmit").addEventListener("click", checkAnswers);
    document.getElementById("btnTryAgain").addEventListener("click", clearFields);
    document.getElementById("btnExplain").addEventListener("click", showExplanation);
    document.getElementById("btnNext").addEventListener("click", generateRandomProblem);
});
