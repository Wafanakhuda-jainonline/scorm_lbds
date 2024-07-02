document.addEventListener('DOMContentLoaded', function() {
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const explanationModal = document.getElementById('explanationModal');
    const explanationContent = explanationModal.querySelector('.content-box');
    const problemDescription = document.getElementById('Problem-Description');
    const btnClose = explanationModal.querySelector('.close');

    // let currentProblem = {
    //     company: "ABC Electronics",
    //     tvName: "smart TV",
    //     tvPrice: 800,
    //     soundbarName: "soundbar",
    //     soundbarPrice: 200,
    //     deviceName: "streaming device",
    //     devicePrice: 50,
    //     discountRate: 10 // 10%
    // };
    let currentProblem = generateNewProblem();
    updateProblemDescription(currentProblem);
    currentProblem.correctAnswer = calculateBundlePrice(currentProblem.tvPrice, currentProblem.soundbarPrice, currentProblem.devicePrice, currentProblem.discountRate);
    document.getElementById('btnSubmit').addEventListener('click', function() {
        const userAnswer = parseFloat(answerInput.value);
        if (Math.abs(userAnswer - currentProblem.correctAnswer) < 0.01) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    
    });

    document.getElementById('btnTryAgain').addEventListener('click', function() {
        answerInput.value = '';
        feedback.textContent = '';
    });

    document.getElementById('btnExplain').addEventListener('click', function() {
        // Retrieve the current problem values
        const { tvPrice, soundbarPrice, devicePrice, discountRate, correctAnswer } = currentProblem;
        const totalPrice = tvPrice + soundbarPrice + devicePrice;
        const discountAmount = totalPrice * (discountRate / 100);
        const discountedPrice = totalPrice - discountAmount;
    
        // Generate a detailed explanation
        explanationContent.innerHTML = `
            <p>How to Solve the Problem...</p>
            <p><strong>Step-by-Step Solution:</strong></p>
            <ol>
                <li><strong>Calculate the total price without any discount:</strong><br>
                    Total Price = Smart TV Price + Soundbar Price + Streaming Device Price<br>
                    Total Price = $${tvPrice} + $${soundbarPrice} + $${devicePrice} = $${totalPrice}
                </li>
                <li><strong>Apply a ${discountRate}% discount:</strong><br>
                <p><strong>Formula:</strong><br>
                    Discounted Price = Total Price - (Discount Percentage * Total Price)
                 </p>
                    Discounted Price = Total Price - (${discountRate}% of Total Price)<br>
                    Discounted Price = $${totalPrice} - (${discountRate}% * $${totalPrice}) = <span class="correct">$${discountedPrice.toFixed(2)}</span>
                </li>
            </ol> 
        `;
        explanationModal.style.display = 'block';
    });
    

    btnClose.addEventListener('click', function() {
        explanationModal.style.display = 'none';
    });

    document.getElementById('btnNext').addEventListener('click', function() {
        currentProblem = generateNewProblem(); // Generate a new problem
        updateProblemDescription(currentProblem); // Update the description with new problem details
        currentProblem.correctAnswer = calculateBundlePrice(currentProblem.tvPrice, currentProblem.soundbarPrice, currentProblem.devicePrice, currentProblem.discountRate); // Update correct answer
        feedback.textContent = ''; // Clear previous feedback
        answerInput.value = ''; // Clear previous answer
    });

    function calculateBundlePrice(tv, soundbar, device, discountPercentage) {
        const total = tv + soundbar + device;
        const discount = total * (discountPercentage / 100);
        return Math.round((total - discount) * 100) / 100; // Round to two decimal places
    }

    function generateNewProblem() {
        // Define a list of potential company names
        const companyNames = ["ABC Electronics", "Tech Innovations", "Gadget Galaxy", "ElectroHub", "Future Tech"];
    
        // Generate prices in multiples of 100
        const tvPrice = Math.floor((Math.random() * 5) + 5) * 100; // New TV price between 500 and 1000
        const soundbarPrice = Math.floor((Math.random() * 2) + 1) * 100; // New soundbar price between 100 and 300
        const devicePrice = Math.floor((Math.random() * 5) + 1) * 10; // New device price between 10 and 50, adjusting for smaller range
        const discountRate = Math.floor((Math.random() * 15) + 5); // New discount between 5% and 20%
    
        // Randomly select a company name from the list
        const company = companyNames[Math.floor(Math.random() * companyNames.length)];
    
        const correctAnswer = calculateBundlePrice(tvPrice, soundbarPrice, devicePrice, discountRate);
    
        return {
            company, // Use the randomly selected company name
            tvName: "smart TV",
            tvPrice,
            soundbarName: "soundbar",
            soundbarPrice,
            deviceName: "streaming device",
            devicePrice,
            discountRate,
            correctAnswer
        };
    }
    

    function updateProblemDescription(problem) {
        problemDescription.innerHTML = `${problem.company} is launching a new line of home entertainment systems, offering a bundle that includes a ${problem.tvName}, a ${problem.soundbarName}, and a ${problem.deviceName}. The individual prices for the TV, soundbar, and streaming device are $${problem.tvPrice}, $${problem.soundbarPrice}, and $${problem.devicePrice}, respectively. Assume ${problem.company} decides to offer a ${problem.discountRate}% discount on the bundle.`;
    }
});
