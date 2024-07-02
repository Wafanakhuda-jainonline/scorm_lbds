document.addEventListener("DOMContentLoaded", function() {
    // Initial global variables
    var current_ratio = 4.5;
    var quick_ratio = 3;
    var inventory = 36000;

    // Function to calculate liabilities and assets
    function calculateLiabilitiesAndAssets() {
        var liabilities = Math.round(inventory / (current_ratio - quick_ratio));
        var assets = Math.round(current_ratio * liabilities);
        return { liabilities, assets };
    }

    // Function to handle submit button click
  // Function to handle submit button click
   function submitAnswer() {
    var liabilitiesInput = parseInt(document.getElementById('liabilities').value, 10);
    var assetsInput = parseInt(document.getElementById('assets').value, 10);
    var correctValues = calculateLiabilitiesAndAssets();

    var liabilitiesFeedback = document.getElementById('liabilitiesFeedback');
    var assetsFeedback = document.getElementById('assetsFeedback');
    var overallFeedbackElement = document.getElementById('feedback');

    var liabilitiesCorrect = liabilitiesInput === correctValues.liabilities;
    var assetsCorrect = assetsInput === correctValues.assets;

    liabilitiesFeedback.innerText = liabilitiesCorrect ? 'Correct' : 'Incorrect';
    liabilitiesFeedback.style.color = liabilitiesCorrect ? 'green' : 'red';

    assetsFeedback.innerText = assetsCorrect ? 'Correct' : 'Incorrect';
    assetsFeedback.style.color = assetsCorrect ? 'green' : 'red';

    if (liabilitiesCorrect && assetsCorrect) {
        overallFeedbackElement.innerHTML = '<span style="color: green; font-weight: bold; font-size: 24px;">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
    } else {
        overallFeedbackElement.innerHTML = '<span style="color: red; font-size: 24px; font-weight: bold;">Incorrect, try again.</span>';
    }
}


    // Function to handle the next button click
    function nextProblem() {
        var companyNames = ["ABC Private Limited", "XYZ Private Limited", "Alpha Private Limited", "Beta Private Limited", "AlephNaught", "Infinity Systems", "Mangani Fabricators", "Gupta Textiles", "Madras Idly Shop", "Delhi Dhaba", "Healthy Smoothies", "Samrat Automobiles"];
    
        var companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
        current_ratio = ((Math.floor(Math.random() * (60 - 30) + 30)) / 10).toFixed(1);
        quick_ratio = ((Math.floor(Math.random() * (50 - 20) + 20)) / 10).toFixed(1);
    
        // Generate a random number and round it to the nearest hundred
        inventory = Math.round((Math.random() * (100000 - 5000) + 5000) / 100) * 100;
    
        // Update the problem description inside the content box
        var problemDescriptionBox = document.querySelector('#problem-description + .scroll-section .content-box p');
        problemDescriptionBox.innerText = companyName + " has a current ratio of " + current_ratio + ":1 and a quick ratio of " + quick_ratio + ":1; if the inventory is " + inventory + ", calculate the current liabilities and current assets.";
    
        document.getElementById('liabilities').value = "";
        document.getElementById('assets').value = "";
        document.getElementById('feedback').innerText = "";
    }
    

    // Function to handle the try again button click
    function handleTryAgain() {
        document.getElementById('liabilities').value = "";
        document.getElementById('assets').value = "";
        document.getElementById('feedback').innerText = "";
    }
    // Function to handle the explain button click
   // Function to handle the explain button click
    function showExplanation() {
        var correctValues = calculateLiabilitiesAndAssets();

        // Detailed calculation steps
        var liabilitiesCalculation = "Inventory / (Current Ratio - Quick Ratio) = " + inventory + " / (" + current_ratio + " - " + quick_ratio + ") = " + correctValues.liabilities;
        var assetsCalculation = "Current Liabilities * Current Ratio = " + correctValues.liabilities + " * " + current_ratio + " = " + correctValues.assets;

        var explanationText = "<p>To calculate the Current Liabilities and Current Assets:</p>" +
                            "<ul>" +
                            "<li><strong>Current Liabilities</strong>: " + liabilitiesCalculation + ".</li>" +
                            "<li><strong>Current Assets</strong>: " + assetsCalculation + ".</li>" +
                            "</ul>" +
                            "<p><strong>The correct values are:</strong></p>" +
                            "<ul>" +
                            "<li>Liabilities: <span class='correct'>" + correctValues.liabilities + "</span></li>" +
                            "<li>Assets: <span class='correct'>" + correctValues.assets + "</span></li>" +
                            "</ul>";

        var explanationElement = document.getElementById('explanationModal');
        explanationElement.style.display = 'block';
        explanationElement.querySelector('.content-box').innerHTML = explanationText;
    }


    // Add event listeners
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnNext').addEventListener('click', nextProblem);
    document.getElementById('btnTryAgain').addEventListener('click', handleTryAgain);
    document.getElementById('btnExplain').addEventListener('click', showExplanation);
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });
});
