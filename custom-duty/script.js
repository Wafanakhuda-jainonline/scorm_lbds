document.addEventListener("DOMContentLoaded", function() {
    const companyNames = [
        "ABC Limited", "XYZ Corp", "Quantum Industries", "GigaTech", "Delta Electronics",
        "Orion Solutions", "Nova Imports", "Galactic Enterprises", "Eclipse Textiles", "Terra Manufacturing"
    ];

    var currentParameters = {
        companyName: "ABC Limited",
        fobValue: 100000,
        packagingCharges: 20000,
        airFreightCharges: 28000,
        transitInsurance: 10000,
        designDevelopmentCharges: 9000,
        sellingCommission: 5000, // INR
        exchangeRate: 60, // USD to INR
        bcdRate: 0.15, // Basic Custom Duty Rate
        igstRate: 0.18 // IGST Rate
    };

    function calculateCustomDuties() {
        let totalCostUSD = currentParameters.fobValue + currentParameters.packagingCharges + currentParameters.airFreightCharges +
                           currentParameters.transitInsurance + currentParameters.designDevelopmentCharges;
        let assessableValue = totalCostUSD * currentParameters.exchangeRate + currentParameters.sellingCommission;
        let basicCustomDuty = assessableValue * currentParameters.bcdRate;
        let totalCustomDuty = basicCustomDuty + (assessableValue + basicCustomDuty) * currentParameters.igstRate;
        return { assessableValue, basicCustomDuty, totalCustomDuty };
    }

    function updateProblemDescription() {
        let problemDescriptionElement = document.getElementById('problemdescription');
        problemDescriptionElement.innerHTML = `${currentParameters.companyName} imported certain goods from the USA at New Mangalore Port, costing $${currentParameters.fobValue.toLocaleString()} FOB, other details are as follows:` +
            `<ul>
                <li>Packaging charges $${currentParameters.packagingCharges.toLocaleString()}</li>
                <li>Air freight charges $${currentParameters.airFreightCharges.toLocaleString()}</li>
                <li>Transit insurance $${currentParameters.transitInsurance.toLocaleString()}</li>
                <li>Design and development charges $${currentParameters.designDevelopmentCharges.toLocaleString()}</li>
                <li>Selling Commission to be paid by the Indian importer Rs. ${currentParameters.sellingCommission.toLocaleString()}</li>
                <li>Rate of exchange announced by CBIC- $1 = Rs. ${currentParameters.exchangeRate}</li>
                <li>BCD 15% and IGST 18%.</li>
            </ul>`;
    }
    

    // document.getElementById('btnSubmit').addEventListener('click', function() {
    //     // Retrieve user inputs and remove any commas
    //     let assessableValueInput = parseFloat(document.getElementById('assessableValue').value.replace(/,/g, ''));
    //     let basicCustomDutyInput = parseFloat(document.getElementById('basicCustomDuty').value.replace(/,/g, ''));
    //     let totalCustomDutyInput = parseFloat(document.getElementById('totalCustomDuty').value.replace(/,/g, ''));
    
    //     // Calculate the actual values to compare against
    //     let values = calculateCustomDuties();
    
    //     // Construct feedback text based on comparisons
    //     let feedbackText = `Assessable Value is ${assessableValueInput === values.assessableValue ? 'correct' : 'incorrect'}.<br>` +
    //                        `Basic Custom Duty is ${basicCustomDutyInput === values.basicCustomDuty ? 'correct' : 'incorrect'}.<br>` +
    //                        `Total Custom Duty is ${totalCustomDutyInput === values.totalCustomDuty ? 'correct' : 'incorrect'}.`;
    //     document.getElementById('feedback').innerHTML = feedbackText;
    // });
    document.getElementById('btnSubmit').addEventListener('click', function() {
        let assessableValueInput = parseFloat(document.getElementById('assessableValue').value.replace(/,/g, ''));
        let basicCustomDutyInput = parseFloat(document.getElementById('basicCustomDuty').value.replace(/,/g, ''));
        let totalCustomDutyInput = parseFloat(document.getElementById('totalCustomDuty').value.replace(/,/g, ''));
    
        let values = calculateCustomDuties();
    
        document.getElementById('assessableValueFeedback').textContent = assessableValueInput === values.assessableValue ? 'Correct' : 'Incorrect';
        document.getElementById('basicCustomDutyFeedback').textContent = basicCustomDutyInput === values.basicCustomDuty ? 'Correct' : 'Incorrect';
        document.getElementById('totalCustomDutyFeedback').textContent = totalCustomDutyInput === values.totalCustomDuty ? 'Correct' : 'Incorrect';
    
        document.getElementById('assessableValueFeedback').className = assessableValueInput === values.assessableValue ? 'feedback-span correct' : 'feedback-span incorrect';
        document.getElementById('basicCustomDutyFeedback').className = basicCustomDutyInput === values.basicCustomDuty ? 'feedback-span correct' : 'feedback-span incorrect';
        document.getElementById('totalCustomDutyFeedback').className = totalCustomDutyInput === values.totalCustomDuty ? 'feedback-span correct' : 'feedback-span incorrect';
    
        let overallFeedbackElement = document.getElementById('feedback');
        let allCorrect = (assessableValueInput === values.assessableValue) && (basicCustomDutyInput === values.basicCustomDuty) && (totalCustomDutyInput === values.totalCustomDuty);
    
        if (allCorrect) {
            overallFeedbackElement.innerHTML = '<span style="color: green; font-weight: bold; font-size: 24px;">All answers are correct. Well done! You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
        } else {
            overallFeedbackElement.innerHTML = '<span style="color: red; font-size: 24px; font-weight: bold;">Some answers are incorrect. Please try again.</span>';
        }
    });
    
    
    

    document.getElementById('btnTryAgain').addEventListener('click', function() {
        document.getElementById('assessableValue').value = '';
        document.getElementById('basicCustomDuty').value = '';
        document.getElementById('totalCustomDuty').value = '';
        document.getElementById('feedback').innerHTML = '';
    });

    document.getElementById('btnNext').addEventListener('click', function() {
        // Update the company name randomly from the list
        currentParameters.companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    
        // Ensuring values are in multiples of 1000 for specified fields
        currentParameters.fobValue = Math.floor(Math.random() * 500 + 50) * 1000;
        currentParameters.packagingCharges = Math.floor(Math.random() * 10 + 10) * 1000;
        currentParameters.airFreightCharges = Math.floor(Math.random() * 10 + 15) * 1000;
        currentParameters.transitInsurance = Math.floor(Math.random() * 5 + 5) * 1000;
        currentParameters.designDevelopmentCharges = Math.floor(Math.random() * 5 + 4) * 1000;
        currentParameters.sellingCommission = Math.floor(Math.random() * 10 + 40) * 1000;
    
        // Ensuring the exchange rate is in multiples of 10
        currentParameters.exchangeRate = (Math.floor(Math.random() * 3) + 5) * 10;
    
        // Call the update function to reflect these changes
        updateProblemDescription();
        document.getElementById('assessableValue').value = '';
        document.getElementById('basicCustomDuty').value = '';
        document.getElementById('totalCustomDuty').value = '';
        document.getElementById('assessableValueFeedback').textContent = '';
        document.getElementById('basicCustomDutyFeedback').textContent = '';
        document.getElementById('totalCustomDutyFeedback').textContent = '';
        document.getElementById('feedback').innerHTML = '';
    });
    
    
    document.getElementById('btnExplain').addEventListener('click', explain);

    function explain() {
        let values = calculateCustomDuties();
        const explanationElement = document.getElementById("explanationModal");
        let explanationHTML = `
                <h3 class="blue-bold">How to Solve the Problem</h3>
                <p>This problem involves calculating the assessable value, basic custom duty, and total custom duty for an import scenario. Here are the steps and formulas used for the calculation:</p>
                <h4>1. Assessable Value Calculation</h4>
                <p>The assessable value is calculated by adding all the costs associated with the goods before they reach the importer. This includes the FOB value, packaging charges, air freight charges, transit insurance, and design and development charges.</p>
                <p><strong>Formula:</strong> Assessable Value = FOB Value + Packaging Charges + Air Freight Charges + Transit Insurance + Design and Development Charges</p>
                <p>For this scenario, the calculated assessable value is <span class='correct'> Rs. ${values.assessableValue.toLocaleString()}</span></p>
                <h4>2. Basic Custom Duty Calculation</h4>
                <p>Basic Custom Duty is calculated as a percentage of the assessable value.</p>
                <p><strong>Formula:</strong> Basic Custom Duty = Assessable Value × BCD Rate</p>
                <p>In this case, BCD Rate is ${currentParameters.bcdRate * 100}%. The calculation is Rs. ${values.assessableValue.toLocaleString()} × ${currentParameters.bcdRate * 100}% =<span class='correct'> Rs. ${values.basicCustomDuty.toLocaleString()}</span></p>
                <h4>3. Total Custom Duty Calculation</h4>
                <p>Total Custom Duty includes Basic Custom Duty and IGST on the sum of the Assessable Value and Basic Custom Duty.</p>
                <p><strong>Formula:</strong> Total Custom Duty = Basic Custom Duty + (Assessable Value + Basic Custom Duty) × IGST Rate</p>
                <p>Given IGST Rate is ${currentParameters.igstRate * 100}%. The IGST calculation is (Rs. ${values.assessableValue.toLocaleString()} + Rs. ${values.basicCustomDuty.toLocaleString()}) × ${currentParameters.igstRate * 100}% ≈ Rs. ${(values.totalCustomDuty - values.basicCustomDuty).toLocaleString()}.</p>
                <p>Total Custom Duty = Rs. ${values.basicCustomDuty.toLocaleString()} (BCD) + Rs. ${(values.totalCustomDuty - values.basicCustomDuty).toLocaleString()} (IGST) = <span class='correct'>Rs. ${values.totalCustomDuty.toLocaleString()}</span></p>
            `;
         // Adding the tabular format for the calculations
            explanationHTML += `
            <h4>Summary of Calculations:</h4>
            <table border="1">
                <tr>
                    <th>Description</th>
                    <th>Calculation</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td>Assessable Value</td>
                    <td>Directly Provided</td>
                    <td>Rs. ${values.assessableValue.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Basic Custom Duty (15%)</td>
                    <td>Rs. ${values.assessableValue.toLocaleString()} × 15%</td>
                    <td>Rs. ${values.basicCustomDuty.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>IGST (18% on Assessable Value + BCD)</td>
                    <td>(Rs. ${values.assessableValue.toLocaleString()} + Rs. ${values.basicCustomDuty.toLocaleString()}) × 18%</td>
                    <td>Rs. ${(values.totalCustomDuty - values.basicCustomDuty).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Total Custom Duty</td>
                    <td>BCD + IGST</td>
                    <td>Rs. ${values.totalCustomDuty.toLocaleString()}</td>
                </tr>
            </table>
            `;

        explanationElement.querySelector('.content-box').innerHTML = explanationHTML;
        explanationElement.style.display = 'block'; // Show modal
        document.getElementById('assessableValue').value = '';
        document.getElementById('basicCustomDuty').value = '';
        document.getElementById('totalCustomDuty').value = '';
        document.getElementById('assessableValueFeedback').textContent = '';
        document.getElementById('basicCustomDutyFeedback').textContent = '';
        document.getElementById('totalCustomDutyFeedback').textContent = '';
        document.getElementById('feedback').innerHTML = '';
    }



    
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    updateProblemDescription();
});
