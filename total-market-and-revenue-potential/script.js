document.addEventListener('DOMContentLoaded', function() {
    let currentProblem = generateNewProblem();

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomNumberDivisibleBy(min, max, divisor) {
        return Math.floor(Math.random() * (max - min + 1) + min) * divisor;
    }

    function generateNewProblem() {
        const customers = {
            A: generateRandomNumberDivisibleBy(4, 6, 1000000),
            B: generateRandomNumberDivisibleBy(7, 9, 1000000),
            C: generateRandomNumberDivisibleBy(5, 7, 1000000)
        };
        const spending = {
            A: generateRandomNumberDivisibleBy(4, 6, 100),
            B: generateRandomNumberDivisibleBy(6, 8, 100),
            C: generateRandomNumberDivisibleBy(5, 7, 100)
        };

        let description = generateProblemDescription(customers, spending);
        let totalMarketPotential = calculateTotalMarketPotential(customers);
        let totalRevenuePotential = calculateTotalRevenuePotential(customers, spending);

        return { description, totalMarketPotential, totalRevenuePotential };
    }

    function generateProblemDescription(customers, spending) {
        let description = "Delight Corporation, a leading electronics manufacturer, plans to introduce a new line of smart phones in a competitive market. The company has identified three potential customer segments based on demographic factors:<br>" +
                          "Segment A (Age 18-24), Segment B (Age 25-35), and Segment C (Age 36-45).<br><br>";

        description += "The estimated market size for each segment is as follows:<br>";
        Object.entries(customers).forEach(([segment, count]) => {
            description += `• Segment ${segment}: ${count / 1000000} million potential customers<br>`;
        });

        description += "<br>Additionally, the company has gathered data on the expected average annual spending on smartphones for each segment:<br>";
        Object.entries(spending).forEach(([segment, amount]) => {
            description += `• Segment ${segment}: $${amount} per customer<br>`;
        });

        return description;
    }

    function calculateTotalMarketPotential(customers) {
        return Object.values(customers).reduce((acc, val) => acc + val, 0);
    }

    function calculateTotalRevenuePotential(customers, spending) {
        return Object.keys(customers).reduce((acc, key) => acc + customers[key] * spending[key], 0);
    }

    function submitAnswer() {
        var marketPotentialInput = document.getElementById('marketPotential').value.trim();
        var revenuePotentialInput = document.getElementById('revenuePotential').value.trim();
        var feedback = document.getElementById('feedback');

        var marketPotentialValue = parseFloat(marketPotentialInput.replace(/\s+million$/, '')) * 1000000;
        var revenuePotentialValue = parseFloat(revenuePotentialInput.replace(/\s+billion$/, '')) * 1000000000;

        if (Math.abs(marketPotentialValue - currentProblem.totalMarketPotential) < 0.01 &&
            Math.abs(revenuePotentialValue - currentProblem.totalRevenuePotential) < 100000000) {
            feedback.className = 'feedback correct';
            feedback.innerText = 'Correct Answer!';
        } else {
            feedback.className = 'feedback incorrect';
            feedback.innerText = 'Incorrect Answer, Try Again!';
        }
    
    }

    function tryAgain() {
        document.getElementById('marketPotential').value = '';
        document.getElementById('revenuePotential').value = '';
        document.getElementById('feedback').innerText = '';
        document.getElementById('explanation').innerText = '';
    }

    function explain() {
        const explanationModal = document.getElementById('explanationModal');
        const contentBox = explanationModal.querySelector('.content-box');
        contentBox.innerHTML = generateExplanationContent();
        explanationModal.style.display = 'block';
    }
    
    function generateExplanationContent() {
        const { totalMarketPotential, totalRevenuePotential } = currentProblem;
    
        const formattedMarketPotential = (totalMarketPotential / 1000000).toLocaleString();
        const formattedRevenuePotential = (totalRevenuePotential / 1000000000).toFixed(1);
    
        return `
            <h4 class="explanation-heading">How to Solve the Problem...</h4>
            <div>
                <p><strong>Total Market Potential:</strong> The estimated market size for all segments is calculated by summing up the individual market sizes of each segment.</p>
                <p>Calculated Total Market Potential in USD= ${formattedMarketPotential} million USD</p>
            </div>
            <div>
                <p><strong>Total Revenue Potential:</strong> The total revenue potential is calculated by multiplying the market size of each segment with its average annual spending and summing these values for all segments.</p>
                <p>Calculated Total Revenue Potential in USD= ${formattedRevenuePotential} billion USD</p>
            </div>
        `;
    }
    

    function nextProblem() {
        // Generate a new problem and update the display
        currentProblem = generateNewProblem();
        updateProblemDisplay();
    
        // Clear input fields directly
        const marketPotentialInput = document.getElementById('marketPotential');
        const revenuePotentialInput = document.getElementById('revenuePotential');
        if (marketPotentialInput && revenuePotentialInput) {
            marketPotentialInput.value = '';
            revenuePotentialInput.value = '';
        }
    
        // Clear feedback
        const feedbackElement = document.getElementById('feedback');
        if (feedbackElement) {
            feedbackElement.innerText = '';
        }
    }
    
   

    function updateProblemDisplay() {
        document.getElementById('problem-description').innerHTML = currentProblem.description;
        document.getElementById('marketPotential').placeholder = "Enter Total Market Potential";
        document.getElementById('revenuePotential').placeholder = "Enter Total Revenue Potential";
        document.getElementById('feedback').textContent = '';
        
     
    }

    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnTryAgain').addEventListener('click', tryAgain);
    document.getElementById('btnExplain').addEventListener('click', explain);
    document.getElementById('btnNext').addEventListener('click', nextProblem);
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    updateProblemDisplay();
});
