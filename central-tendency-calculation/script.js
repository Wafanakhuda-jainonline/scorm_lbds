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
        document.getElementById('scenario').innerText = `${scenario.text} ${dataSet.join(", ")}`;
    }

    // Check the user's answers for mean, median, and mode
    function checkAnswers() {
        // Get user input
        let meanAnswer = parseFloat(document.getElementById('mean').value);
        let medianAnswer = parseFloat(document.getElementById('median').value);
        let modeAnswer = parseFloat(document.getElementById('mode').value);
        
        // Check for NaN inputs and alert the user
        if (isNaN(meanAnswer) || isNaN(medianAnswer) || isNaN(modeAnswer)) {
            alert('Please enter valid numbers for mean, median, and mode.');
            return;
        }
    
        // Calculate the correct mean, median, and mode
        let correctMean = calculateMean(dataSet);
        let correctMedian = calculateMedian(dataSet);
        let correctMode = calculateMode(dataSet);
    
        // Round both the calculated mean and the user's mean answer to two decimal places
        meanAnswer = parseFloat(meanAnswer.toFixed(2));
        correctMean = parseFloat(correctMean.toFixed(2));
    
        let resultsHTML = '';
  
        let correctCount = 0;
        // Compare the rounded values
        if (meanAnswer === correctMean) {
            resultsHTML += '<div style="color: green;">Mean: Correct</div>';
            correctCount++;
        } else {
            resultsHTML += `<div style="color: red;">Mean: Incorrect </div>`;
        }
        if (medianAnswer === correctMedian) {
            resultsHTML += '<div style="color: green;">Median: Correct</div>';
           correctCount++;
        } else {
            resultsHTML += '<div style="color: red;">Median: Incorrect</div>';
        }
    
        if (correctMode.includes(modeAnswer)) {
            resultsHTML += '<div style="color: green;">Mode: Correct</div>';
            correctCount++;
        } else {
            resultsHTML += '<div style="color: red;">Mode: Incorrect</div>';
        }
       
        
        // Update the feedback element
        document.getElementById('feedback').innerHTML = resultsHTML;
       

        // Update overall feedback based on correct answers
        if (correctCount === 3) {
            document.getElementById('overallFeedback').innerHTML = '<div style="color: green;">All answers are correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</div>';
        } else {
            document.getElementById('overallFeedback').innerHTML = '<div style="color: red;">Some answers are incorrect. You can click TRY AGAIN or EXPLAIN.</div>';
        }
    
        // Hide explanation if it's showing
        document.getElementById('explanation').style.display = 'none';
    }
    
    
    // Calculate the mean of the data set
    function calculateMean(data) {
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }

    // Calculate the median of the data set
    function calculateMedian(data) {
        const sortedData = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        return sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2;
    }

    // Calculate the mode of the data set
    // Function to calculate mode
        function calculateMode(data) {
            const freqMap = data.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});

            let maxFreq = Math.max(...Object.values(freqMap));
            let modes = [];
            for (const [number, freq] of Object.entries(freqMap)) {
                if (freq === maxFreq) {
                    modes.push(Number(number));
                }
            }
            return modes; // Always return an array
        }
        //function to calculate one single mode
        // function calculateMode(data) {
        //     const frequency = {};
        //     let maxFreq = 0;
        //     let mode;
        
        //     data.forEach((value) => {
        //         frequency[value] = (frequency[value] || 0) + 1;
        //         if (frequency[value] > maxFreq) {
        //             maxFreq = frequency[value];
        //             mode = value; // Keep the first mode encountered
        //         }
        //     });
        
        //     return mode; // Return the single mode value
        // }


    // Show the explanation modal
    function showExplanation() {
        const mean = calculateMean(dataSet).toFixed(2);
        const median = calculateMedian(dataSet);
        const mode = calculateMode(dataSet); // calculateMode now always returns an array
    
        let explanationHTML = `
        <strong>Arithmetic Mean (Average):</strong> Add all numbers (${dataSet.join(" + ")}) and divide by the count (${dataSet.length}).<br>
        <strong>Calculation:</strong> ${dataSet.reduce((acc, val) => acc + val, 0)} / ${dataSet.length} = <span style="color: green; font-weight: bold;">${mean}</span><br>
        <strong>Median:</strong> Sort the numbers and find the middle value.<br>
        <strong>Sorted Data:</strong> ${[...dataSet].sort((a, b) => a - b).join(", ")}<br>
        <strong>Median Value:</strong> <span style="color: green; font-weight: bold;">${median}</span><br>
        <strong>Mode:</strong> Find the number(s) that appears most frequently.<br>
        <strong>Modes:</strong> <span style="color: green; font-weight: bold;">${mode.join(", ")}</span><br>
        
        `;
    
        // Set the explanation in the modal's content-box and display the modal
        const modalContentBox = document.querySelector("#explanationModal .content-box");
        modalContentBox.innerHTML = explanationHTML;
        const modal = document.getElementById("explanationModal");
        modal.style.display = 'block';
    }
    
    // Generate the explanation text
    function generateExplanation() {
        return `The mean is calculated by summing all the values and dividing by the number of values.
                The median is the middle value when a data set is ordered from least to greatest.
                The mode is the number that appears most frequently in the data set.`;
    }

    // Reset the form for a new attempt
    function tryAgain() {
        document.getElementById('mean').value = '';
        document.getElementById('median').value = '';
        document.getElementById('mode').value = '';
        document.getElementById('feedback').innerHTML = '';
        const explanationElem = document.getElementById("explanationModal");
        explanationElem.style.display = 'none';
    }

    // Load a new scenario and reset the form
    function nextProblem() {
        tryAgain();
        generateScenario();
    }

    // Attach event listeners to buttons
    document.getElementById("btnSubmit").addEventListener("click", checkAnswers);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", showExplanation);
    document.getElementById("btnNext").addEventListener("click", nextProblem);
  
    // Close the explanation modal when the close button is clicked
    document.querySelector("#explanationModal .close").addEventListener("click", function() {
        document.getElementById("explanationModal").style.display = 'none';
    });

    // Initialize the first scenario
    generateScenario();
});