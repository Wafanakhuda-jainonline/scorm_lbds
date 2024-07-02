document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('btnSubmit');
    const tryAgainButton = document.getElementById('btnTryAgain');
    const explainButton = document.getElementById('btnExplain');
    const nextButton = document.getElementById('btnNext');
    const feedback = document.getElementById('feedback');
    const explanationModal = document.getElementById('explanationModal');
    const closeButton = explanationModal.querySelector('.close');

    // Event Listeners
    submitButton.addEventListener('click', submitAnswer);
    tryAgainButton.addEventListener('click', tryAgain);
    explainButton.addEventListener('click', explain);
    nextButton.addEventListener('click', next);
    closeButton.addEventListener('click', function() {
        explanationModal.style.display = 'none';
    });

    function submitAnswer() {
        const correctAnswers = {
            npv: 'Saras',
            pp: 'Aaras',
            pi: 'Saras',
            dpb: 'Aaras'
        };
    
        const userAnswers = {
            npv: document.getElementById('chooseNPV').value,
            pp: document.getElementById('choosePP').value,
            pi: document.getElementById('choosePI').value,
            dpb: document.getElementById('chooseDPB').value
        };
    
        let allCorrect = true; // Flag to track if all answers are correct
    
        for (const key in correctAnswers) {
            const selectElement = document.getElementById(`choose${key.toUpperCase()}`);
            let feedbackElement = selectElement.nextElementSibling;
    
            // Create feedback element if it doesn't exist
            if (!feedbackElement || !feedbackElement.classList.contains('feedback')) {
                feedbackElement = document.createElement('span');
                feedbackElement.classList.add('feedback');
                selectElement.parentNode.insertBefore(feedbackElement, selectElement.nextSibling);
            }
    
            // Update individual feedback and adjust the allCorrect flag
            if (userAnswers[key] === correctAnswers[key]) {
                feedbackElement.textContent = 'Correct!';
                feedbackElement.style.color = 'green';
            } else {
                feedbackElement.textContent = 'Incorrect.';
                feedbackElement.style.color = 'red';
                allCorrect = false; // Set flag to false if any answer is incorrect
            }
        }
    
        // Update the overall feedback
        if (allCorrect) {
            feedback.innerHTML = '<p>All answers are correct! You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem</p>';
            feedback.style.color = 'green';
            feedback.style.fontWeight = 'bold';
            feedback.style.fontSize = '24px';
        } else {
            feedback.innerHTML = '<p>Some answers are incorrect. Please TryAgain</p>';
            feedback.style.color = 'red';
            feedback.style.fontWeight = 'bold';
            feedback.style.fontSize = '24px';
           
        }
    }
    
      

      function tryAgain() {
        // Clear all input and select elements
        document.querySelectorAll('input[type=text], select').forEach(element => element.value = '');
        // Clear feedback and explanations
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('explanation').innerHTML = '';
        document.getElementById('explanation').style.display = 'none';
      }
      
      function explain() {
        // Define the explanation content
        const explanationContent = `
          <h3>Detailed Explanation:</h3>
          <p><strong>Net Present Value (NPV):</strong> NPV is the sum of the present values (PV) of cash inflows minus the initial investment cost. The formula is:</p>
          <p>NPV = PV of Cash Inflows - Initial Investment</p>
          <p>Where PV of each cash inflow is calculated as: Cash Inflow / (1 + r)^t</p>
          <p>r is the discount rate, and t is the time period.</p>
      
          <h4>Calculations for Project Saras:</h4>
          <p>Year 1: 100 / (1 + 0.1)<sup>1</sup> = 90.91</p>
          <p>Year 2: 200 / (1 + 0.1)<sup>2</sup> = 165.29</p>
          <p>Year 3: 300 / (1 + 0.1)<sup>3</sup> = 225.39</p>
          <p>Year 4: 450 / (1 + 0.1)<sup>4</sup> = 309.82</p>
          <p>Year 5: 600 / (1 + 0.1)<sup>5</sup> = 372.51</p>
          <p>Total PV of Cash Inflows for Saras = 1164.92</p>
          <p>NPV for Saras = 1164.92 - 700 = 464.92</p>
      
          <h4>Calculations for Project Aaras:</h4>
          <p>Year 1: 500 / (1 + 0.1)<sup>1</sup> = 454.55</p>
          <p>Year 2: 400 / (1 + 0.1)<sup>2</sup> = 330.58</p>
          <p>Year 3: 200 / (1 + 0.1)<sup>3</sup> = 150.26</p>
          <p>Year 4: 100 / (1 + 0.1)<sup>4</sup> = 68.30</p>
          <p>Year 5: 100 / (1 + 0.1)<sup>5</sup> = 62.09</p>
          <p>Total PV of Cash Inflows for Aaras = 1065.78</p>
          <p>NPV for Aaras = 1065.78 - 700 = 365.78</p>
      
          <p><strong>Payback Period (PP):</strong> It's the time it takes for the project to recover its initial investment from net cash inflows.</p>
          <p>For Saras, the PP is achieved in Year 4, and for Aaras, it is achieved between Year 1 and Year 2.</p>
      
          <p><strong>Profitability Index (PI):</strong> PI is calculated as the ratio of the present value of future cash inflows to the initial investment.</p>
          <p>PI for Saras = Total PV of Cash Inflows / Initial Investment = 1164.92 / 700 = 1.664</p>
          <p>PI for Aaras = Total PV of Cash Inflows / Initial Investment = 1065.78 / 700 = 1.522</p>
      
          <p><strong>Discounted Payback Period (DPB):</strong> DPB is the time period in which the initial investment is recovered in discounted terms.</p>
          <p>For Saras, the DPB is just over Year 3, and for Aaras, it is just over Year 1.</p>
      
          <p>Based on NPV and PI, Saras is the recommended project because it has a higher NPV and PI, indicating higher profitability. However, Aaras has a quicker PP and DPB, which could be preferable for quicker investment recovery.</p>
        `;
      
        const explanationBox = explanationModal.querySelector('.content-box');
        explanationBox.innerHTML = explanationContent;
        explanationModal.style.display = "block";
      }
      
      // Sample data sets
      const projectDataSets = [
        {
          projectCost: [700, 700],
          cashInflows: [
            [100, 500],
            [200, 400],
            [300, 200],
            [450, 100],
            [600, 100]
          ],
          pvif: [[1,1],[ 0.909,0.562], [0.826,0.789],[ 0.751,0.438],[ 0.683,0.971], [0.621,0.598]]
        },
        {
          projectCost: [800, 800],
          cashInflows: [
            [150, 550],
            [250, 450],
            [350, 300],
            [500, 150],
            [650, 150]
          ],
          pvif: [[1,1], [0.909,0.543], [0.826,0.651], [0.751,0.123], [0.683,0.892], [0.456,0.621]] // Assuming PVIF remains constant for simplicity
        },
        // Add more data sets as needed
      ];
      
      let currentDataSetIndex = 0;
      
      
      function next() {
        // Increment the data set index to cycle through the sets of data
        currentDataSetIndex = (currentDataSetIndex + 1) % projectDataSets.length;
        const dataSet = projectDataSets[currentDataSetIndex];
      
        // Update the project cost for Saras and Aaras
        document.querySelector('.project-cost-saras').textContent = dataSet.projectCost[0];
        document.querySelector('.project-cost-aaras').textContent = dataSet.projectCost[1];
      
        // Update the cash inflows for Saras and Aaras for all five years
      
        for (let i = 1; i <= 5; i++) {
      console.log(document.querySelector(`.cash-inflow-saras-year-${i}`))
        
          document.querySelector(`.cash-inflow-saras-year-${i}`).textContent = dataSet.cashInflows[i - 1][0];
          document.querySelector(`.cash-inflow-aaras-year-${i}`).textContent = dataSet.cashInflows[i - 1][1];
        }
      
        // Update the PVIF values for Saras and Aaras for all six entries (including year 0)
      
      console.log(dataSet.pvif.length)
      console.log(document.querySelector(`.pvif-aaras-year-${0}`))
        
        for (let i = 0; i < dataSet.pvif.length; i++) {
            document.querySelector(`.pvif-aaras-year-${i}`).textContent = dataSet.pvif[i][1].toFixed(3);
        }
      }
      // This will set up the initial table values on page load
      document.addEventListener('DOMContentLoaded', next);
      
      
});