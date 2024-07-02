document.addEventListener("DOMContentLoaded", function() {
        
        let dataSet = [];
        const scenarios = [
            { text: 'The weight of students in a class in kilograms are as follows:', min: 40, max: 100 },
            { text: 'The height of persons in a neighbourhood in centimetres is as follows:', min: 150, max: 200 },
            { text: 'The scores of a basketball team in various matches are as follows:', min: 50, max: 130 },
            { text: 'The number of books read by students in a month are as follows:', min: 1, max: 20 },
        { text: 'The ages of people attending a community meeting are as follows:', min: 18, max: 90 },
        { text: 'The scores in a spelling bee competition are as follows:', min: 70, max: 100 }, 
        { text: 'The temperatures (in Celsius) for the past week in a city are as follows:', min: -10, max: 35 },
        { text: 'The number of goals scored by a soccer team in a season are as follows:', min: 0, max: 5 },
        { text: 'The daily sales (in USD) of a small shop are as follows:', min: 100, max: 500 },
        { text: 'The time (in minutes) it takes for students to complete a test are as follows:', min: 20, max: 120 }
            // Add more scenarios here
        ];

        
    function generateScenario() {
        const scenarioIndex = Math.floor(Math.random() * scenarios.length);
        const scenario = scenarios[scenarioIndex];
        dataSet = Array.from({ length: 30 }, () => Math.floor(Math.random() * (scenario.max - scenario.min + 1)) + scenario.min);
        document.getElementById('scenario').textContent = scenario.text + ' ' + dataSet.join(", ");
        clearFeedbackAndExplanation();
    }

    function clearFeedbackAndExplanation() {
        document.getElementById('mean').value = '';
        document.getElementById('median').value = '';
        document.getElementById('mode').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('overallFeedback').innerHTML = '';
        document.getElementById('explanation').innerHTML = '';
        document.getElementById('explanationModal').style.display = 'none';
    }
function checkAnswers() {
    // Get user answers
    let meanAnswer = parseFloat(document.getElementById('mean').value);
    let medianAnswer = parseFloat(document.getElementById('median').value);
    let modeAnswer = parseFloat(document.getElementById('mode').value);

    // Validate user input
    if (isNaN(meanAnswer) || isNaN(medianAnswer) || isNaN(modeAnswer)) {
        alert('Please enter valid numbers for mean, median, and mode.');
        return;
    }

    // Calculate correct answers
    let correctMean = calculateMean(dataSet);
    let correctMedian = calculateMedian(dataSet);
    let correctMode = calculateMode(dataSet); // Assuming this function returns the mode as a number

    let resultsHTML = '';
    let correctCount = 0;
    // Define a tolerance for floating-point comparison
    const tolerance = 0.01;

    // Compare the values within the tolerance
    if (Math.abs(meanAnswer - correctMean) <= tolerance) {
        resultsHTML += '<div style="color: green;">Mean: Correct</div>';
        correctCount++;
    } else {
        resultsHTML += `<div style="color: red;">Mean: Incorrect, the correct mean is ${correctMean.toFixed(2)}.</div>`;
    }

    if (Math.abs(medianAnswer - correctMedian) <= tolerance) {
        resultsHTML += '<div style="color: green;">Median: Correct</div>';
        correctCount++;
    } else {
        resultsHTML += `<div style="color: red;">Median: Incorrect, the correct median is ${correctMedian.toFixed(2)}.</div>`;
    }

    // For mode, since it's typically an integer, we can compare directly
    if (modeAnswer === correctMode) {
        resultsHTML += '<div style="color: green;">Mode: Correct</div>';
        correctCount++;
    } else {
        resultsHTML += `<div style="color: red;">Mode: Incorrect, the correct mode is ${correctMode}.</div>`;
    }

    // Determine characteristic
    let characteristicAnswer = document.getElementById('characteristic').value;
    let correctCharacteristic = determineCharacteristic(dataSet);

    if (characteristicAnswer === correctCharacteristic) {
        resultsHTML += '<div style="color: green;">Characteristic: Correct</div>';
        correctCount++;
    } else {
        resultsHTML += `<div style="color: red;">Characteristic: Incorrect, the correct characteristic is ${correctCharacteristic}.</div>`;
    }

    // Update the feedback element with the constructed HTML
    document.getElementById('feedback').innerHTML = resultsHTML;

    // Update overall feedback based on correct answers
    let overallFeedback = document.getElementById('overallFeedback');
    if (correctCount === 4) { // Updated to 4 because we're now checking 4 items
        overallFeedback.innerHTML = '<div style="color: green;">All answers are correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</div>';
    } else {
        overallFeedback.innerHTML = '<div style="color: red;">Some answers are incorrect. You can click TRY AGAIN or EXPLAIN.</div>';
    }

    // Hide explanation if it's showing
    document.getElementById('explanation').style.display = 'none';
}

    

    function calculateMean(data) {
        return data.reduce((acc, val) => acc + val, 0) / data.length;
    }

    function calculateMedian(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    function calculateMode(data) {
        const modeMap = {};
        let maxCount = 1;
        let modes = [data[0]];

        for (const num of data) {
            if (modeMap[num]) {
                modeMap[num]++;
            } else {
                modeMap[num] = 1;
            }
            if (modeMap[num] > maxCount) {
                maxCount = modeMap[num];
                modes = [num];
            } else if (modeMap[num] === maxCount) {
                modes.push(num);
            }
        }

        // Return the first mode encountered
        return modes[0];
    }

    function showExplanation() {
        const mean = calculateMean(dataSet).toFixed(2);
        const median = calculateMedian(dataSet).toFixed(2);
        const mode = calculateMode(dataSet); // Assuming this function returns a single mode

        let explanationHTML = `
        <p><strong>Mean:</strong> Add all numbers (${dataSet.join(" + ")}) and divide by the count (${dataSet.length}).</p>
        <p><strong>Median:</strong> Order the numbers and find the middle value.</p>
        <p><strong>Mode:</strong> The number that appears most frequently.</p>
        <p>In this case, the mean is <span style="color: green; font-weight: bold;">${mean}</span>, the median is <span style="color: green; font-weight: bold;">${median}</span>, and the mode is <span style="color: green; font-weight: bold;">${mode}</span>.</p>
        
        `;
           // Add explanation for the characteristic
    const characteristic = document.getElementById('characteristic').value;
    explanationHTML += `<p>The characteristic of the data set is identified as '${characteristic}' based on the selected option.</p>`;
        const modalContentBox = document.querySelector("#explanationModal .content-box");
        modalContentBox.innerHTML = explanationHTML;
        document.getElementById("explanationModal").style.display = 'block';
    }
            // Close the modal when the close button is clicked
        document.querySelector("#explanationModal .close").addEventListener("click", function() {
            document.getElementById("explanationModal").style.display = 'none';
        });

        // Close the modal when clicking outside of it
        window.addEventListener("click", function(event) {
            const modal = document.getElementById("explanationModal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        function determineCharacteristic(data) {
            const mean = calculateMean(data);
            const median = calculateMedian(data);
        
            // Symmetrical datasets have a mean and median that are approximately equal
            if (Math.abs(mean - median) < 0.1 * mean) {
                return 'symmetrical';
            }
        
            const lowerQuartile = calculateQuartile(data, 0.25);
            const upperQuartile = calculateQuartile(data, 0.75);
        
            // Calculate interquartile range
            const iqr = upperQuartile - lowerQuartile;
        
            // Detect outliers based on the IQR
            const outliers = data.filter(value => value < lowerQuartile - 1.5 * iqr || value > upperQuartile + 1.5 * iqr);
        
            // If outliers are predominantly high values
            if (outliers.length > 0 && outliers.every(value => value > upperQuartile)) {
                return 'highOutliers';
            }
        
            // If outliers are predominantly low values
            if (outliers.length > 0 && outliers.every(value => value < lowerQuartile)) {
                return 'lowOutliers';
            }
        
            // If the mean is greater than the median, the data is often right skewed
            if (mean > median) {
                return 'rightSkewed';
            }
        
            // If the mean is less than the median, the data is often left skewed
            if (mean < median) {
                return 'leftSkewed';
            }
        
            // If none of the above, the dataset might be asymmetrical
            return 'asymmetrical';
        }
        
        // Helper function to calculate the quartile
        function calculateQuartile(data, quartile) {
            const sortedData = [...data].sort((a, b) => a - b);
            const pos = (sortedData.length - 1) * quartile;
            const base = Math.floor(pos);
            const rest = pos - base;
        
            if (sortedData[base + 1] !== undefined) {
                return sortedData[base] + rest * (sortedData[base + 1] - sortedData[base]);
            } else {
                return sortedData[base];
            }
        }
        

    // Event listeners
    document.getElementById("btnSubmit").addEventListener("click", checkAnswers);
    document.getElementById("btnTryAgain").addEventListener("click", clearFeedbackAndExplanation);
    document.getElementById("btnExplain").addEventListener("click", showExplanation);
    document.getElementById("btnNext").addEventListener("click", generateScenario);

    // Initial scenario generation
    generateScenario();
});