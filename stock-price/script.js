document.addEventListener("DOMContentLoaded", function() {
    let currentDataIndex = 0;
    const stockData = [
        {A: [16, 9, 12, 24, 14, 19, 18], B: [12, 6, 11, 7, 14, 12, 14]},
        {A: [15, 10, 14, 20, 13, 18, 17], B: [11, 5, 9, 6, 12, 10, 13]},
        {A: [20, 15, 18, 24, 16, 21, 19], B: [14, 8, 13, 9, 15, 14, 16]},
        {A: [22, 17, 16, 21, 20, 18, 19], B: [10, 12, 11, 13, 14, 13, 12]}, // New set 4
        {A: [14, 13, 15, 14, 16, 15, 14], B: [9, 11, 10, 12, 8, 11, 9]},   // New set 5
        {A: [17, 20, 22, 21, 19, 18, 23], B: [12, 15, 14, 13, 16, 15, 14]}, // New set 6
        {A: [19, 18, 17, 16, 15, 20, 21], B: [13, 14, 11, 10, 9, 8, 12]}  
    ];

    function standardDeviation(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        return Math.sqrt(arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n);
    }

    function updateProblemDescription() {
        const problemDescriptionElement = document.querySelector('.content-box p#problem-description');
        problemDescriptionElement.innerHTML = `From the following two stocks, which is more consistent?<br><br>Stock price (A): ${stockData[currentDataIndex].A.join(', ')}.<br><br>Stock Price (B): ${stockData[currentDataIndex].B.join(', ')}.<br><br>`;
    }

    function clearFields() {
        document.getElementById('answer').value = '';
        document.getElementById('answer2').value = '';
        document.getElementById('stock-a').checked = false;
        document.getElementById('stock-b').checked = false;
        document.getElementById('feedback').textContent = '';
    }
    document.getElementById('btnSubmit').addEventListener('click', function() {
        const stdDev1 = standardDeviation(stockData[currentDataIndex].A);
        const stdDev2 = standardDeviation(stockData[currentDataIndex].B);
    
        const userStdDev1 = parseFloat(document.getElementById('answer').value);
        const userStdDev2 = parseFloat(document.getElementById('answer2').value);
        const selectedA = document.getElementById('stock-a').checked;
        const selectedB = document.getElementById('stock-b').checked;
    
        // Define the feedback variable here, before it's used
        const feedback = document.getElementById('feedback');
    
        // Validate each part of the answer
        const correctStdDev1 = Math.abs(userStdDev1 - stdDev1) < 0.01;
        const correctStdDev2 = Math.abs(userStdDev2 - stdDev2) < 0.01;
        const correctChoice = (stdDev1 < stdDev2 && selectedA) || (stdDev2 < stdDev1 && selectedB);
    
        // Construct feedback
        let feedbackMessage = '';
    
        if (correctStdDev1 && correctStdDev2 && correctChoice) {
            // All answers correct
            feedbackMessage = "All answers are correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.";
            feedback.className = "feedback correct"; // Ensure these classes are defined in your CSS
        } else {
            // Any incorrect answer
            feedbackMessage = "Some answers are incorrect. You can click TRY AGAIN or EXPLAIN.<br>";
            feedbackMessage += `<strong>Standard Deviation of Data Set A:</strong> ${correctStdDev1 ? 'Correct.' : 'Incorrect.'}<br>`;
            feedbackMessage += `<strong>Standard Deviation of Data Set B:</strong> ${correctStdDev2 ? 'Correct.' : 'Incorrect.'}<br>`;
            feedbackMessage += `<strong>More consistent stock choice:</strong> ${correctChoice ? 'Correct.' : 'Incorrect. Please compare the standard deviations again.'}`;
            feedback.className = "feedback incorrect";
        }
    
        feedback.innerHTML = feedbackMessage;
    });
    

    document.getElementById('btnTryAgain').addEventListener('click', function() {
        clearFields();
    });

    document.getElementById('btnNext').addEventListener('click', function() {
        currentDataIndex = (currentDataIndex + 1) % stockData.length;
        updateProblemDescription();
        clearFields();
    });

    document.getElementById('btnExplain').addEventListener('click', function() {
        const dataA = stockData[currentDataIndex].A;
        const dataB = stockData[currentDataIndex].B;
        const titleA = 'Standard Deviation of Data Set A';
        const titleB = 'Standard Deviation of Data Set B';
    
        // Using 'generateComparisonExplanation' to generate the combined explanations and comparison
        const explanationElement = document.querySelector('.modal .content-box');
        explanationElement.innerHTML = generateComparisonExplanation(dataA, dataB, titleA, titleB);
        document.getElementById('explanationModal').style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });
    function generateComparisonExplanation(dataA, dataB, titleA, titleB) {
        const stdDevA = standardDeviation(dataA);
        const stdDevB = standardDeviation(dataB);
        let comparisonResult = '';
    
        // Determine which dataset is more consistent
        if (stdDevA < stdDevB) {
            comparisonResult = `Since the standard deviation of ${titleA} (${stdDevA.toFixed(2)}) is lower than that of ${titleB} (${stdDevB.toFixed(2)}), <span class="correct">${titleA} </span>is more consistent.`;
        } else if (stdDevA > stdDevB) {
            comparisonResult = `Since the standard deviation of ${titleB} (${stdDevB.toFixed(2)}) is lower than that of ${titleA} (${stdDevA.toFixed(2)}), <span class="correct">${titleB} </span> is more consistent.`;
        } else {
            comparisonResult = `Since the standard deviations of <span class="correct"> ${titleA} and ${titleB} </span> are equal (${stdDevA.toFixed(2)}), both datasets are equally consistent.`;
        }
    
        // Generate explanations for both datasets
        let explanationA = generateStepByStepExplanation(dataA, titleA);
        let explanationB = generateStepByStepExplanation(dataB, titleB);
    
        // Combine the explanations with the comparison result
        return `${explanationA}<br>${explanationB}<br><p>${comparisonResult}</p>`;
    }
    
    function generateStepByStepExplanation(data, title) {
        const n = data.length;
        const mean = data.reduce((acc, val) => acc + val, 0) / n;
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
        const stdDev = Math.sqrt(variance);
    
        let explanation = `<h3>${title}</h3>`;
        explanation += `<p><strong>Step 1: Calculate the Mean of the Data Set</strong><br>`;
        explanation += `Sum of all data points: ${data.reduce((acc, val) => acc + val, 0)}<br>`;
        explanation += `Mean (average): (${data.reduce((acc, val) => acc + val, 0)}) / ${n} = ${mean.toFixed(2)}</p>`;
        
        explanation += `<p><strong>Step 2: Calculate the Variance</strong><br>`;
        explanation += `Variance formula: Sum of (each data point - mean)² / ${n}<br>`;
        explanation += `Variance: [${data.map(val => `(${val} - ${mean.toFixed(2)})²`).join(' + ')}] / ${n} = ${variance.toFixed(2)}</p>`;
        
        explanation += `<p><strong>Step 3: Calculate the Standard Deviation</strong><br>`;
        explanation += `Standard deviation: √${variance.toFixed(2)} =<span class="correct"> ${stdDev.toFixed(2)}</span></p>`;
        
        explanation += `<p>The standard deviation is  <span class="correct">${stdDev.toFixed(2)}</span>, indicating the extent of variation or dispersion from the mean.</p>`;
    
        return explanation;
    }
    
    // Initial update of the problem description when the page loads
        updateProblemDescription();

        // Handling the click outside the modal to close it
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('explanationModal');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
        });