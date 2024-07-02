document.addEventListener("DOMContentLoaded", function() {
    let currentDataIndex = 0;
    const stockData = [
        { A: [16, 9, 12, 24, 14, 19, 18], B: [12, 6, 11, 7, 14, 12, 14] },
        { A: [15, 10, 14, 20, 13, 18, 17], B: [11, 5, 9, 6, 12, 10, 13] },
        { A: [20, 15, 18, 24, 16, 21, 19], B: [14, 8, 13, 9, 15, 14, 16] }
    ];

    function standardDeviation(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        return Math.sqrt(arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n);
    }

    function calculateCostOfRetainedEarnings() {
        // Placeholder for the function you might want to use
        // This example is just to fit in the structure
        // Replace with actual implementation
        return standardDeviation(stockData[currentDataIndex].A);
    }

    function submitAnswer() {
        const stdDevA = standardDeviation(stockData[currentDataIndex].A);
        const stdDevB = standardDeviation(stockData[currentDataIndex].B);
        const userStdDev1 = parseFloat(document.getElementById('std-dev-1').value);
        const userStdDev2 = parseFloat(document.getElementById('std-dev-2').value);

        // Check if the user has chosen a stock and if their standard deviation calculations are correct
        const stockAConsistency = stdDevA < stdDevB;
        const stockBConsistency = stdDevB < stdDevA;
        const userChoice = document.getElementById('stock-a').checked ? 'A' : 'B';

        const feedbackElement = document.getElementById('feedback');
        if (!isNaN(userStdDev1) && !isNaN(userStdDev2)) {
            const correctChoice = stockAConsistency ? 'A' : 'B';
            if ((userStdDev1.toFixed(2) === stdDevA.toFixed(2) && userStdDev2.toFixed(2) === stdDevB.toFixed(2)) && userChoice === correctChoice) {
                feedbackElement.innerHTML = '<span style="color: green; font-weight: bold; font-size: 24px;">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem. Stock ' + correctChoice + ' </span>is more consistent.';
            } else {
                feedbackElement.innerHTML = '<span style="color: red; font-weight: bold; font-size: 24px;">Incorrect. Please Try Again!</span> .';
            }
        } else {
            feedbackElement.innerHTML = '<span style="color: red; font-weight: bold; font-size: 24px;">Please enter valid standard deviations for both stocks.</span>';
        }
    }

    function nextProblem() {
        currentDataIndex = (currentDataIndex + 1) % stockData.length;
        const newProblemDescription = `From the following two stocks, which is more consistent?<br><br>
            Stock price (A): ${stockData[currentDataIndex].A.join(', ')}<br><br>
            Stock Price (B): ${stockData[currentDataIndex].B.join(', ')}<br><br>
            
            Use Standard deviation to state which stock is more consistent.`;
        document.querySelector("#problem-description .content-box").innerHTML = newProblemDescription;
        handleTryAgain(); // Reset fields for the next problem
    }
    

    function showExplanation() {
        const stdDevA = standardDeviation(stockData[currentDataIndex].A).toFixed(2);
        const stdDevB = standardDeviation(stockData[currentDataIndex].B).toFixed(2);
        const explanationModalContent = document.querySelector('#explanationModal .content-box');
        const moreConsistentStock = stdDevA < stdDevB ? 'A' : 'B';
    
        explanationModalContent.innerHTML = `<p>The standard deviation of Stock A is <span style="color: green; font-weight: bold;">${stdDevA}</span>.</p>`;
        explanationModalContent.innerHTML += `<p>The standard deviation of Stock B is <span style="color: green; font-weight: bold;">${stdDevB}</span>.</p>`;
        explanationModalContent.innerHTML += `<p>The stock with the lower standard deviation is more consistent. Therefore, Stock <span style="color: green; font-weight: bold;">${moreConsistentStock} is more consistent.</p>`;
        document.getElementById('explanationModal').style.display = 'block';
    }
    

    function updateProblemDescription() {
        const problemDescriptionElement = document.getElementById('problem-description').querySelector('.content-box');
        problemDescriptionElement.innerHTML = `From the following two stocks, which is more consistent?
            <br><br>
            Stock price (A): ${stockData[currentDataIndex].A.join(', ')}.
            <br><br>
            Stock Price (B): ${stockData[currentDataIndex].B.join(', ')}.
            <br><br>
            Use Standard deviation to state which stock is more consistent.`;
    }

    function handleTryAgain() {
        document.getElementById('std-dev-1').value = '';
        document.getElementById('std-dev-2').value = '';
        document.getElementById('stock-a').checked = false;
        document.getElementById('stock-b').checked = false;
        document.getElementById('feedback').textContent = '';
        document.getElementById('explanationModal').style.display = 'none';
    }


    // Event listeners
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnExplain').addEventListener('click', showExplanation);
    document.getElementById('btnNext').addEventListener('click', nextProblem);
    document.getElementById('btnTryAgain').addEventListener('click', handleTryAgain);
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    // Initialize the first problem description
    updateProblemDescription();
});
