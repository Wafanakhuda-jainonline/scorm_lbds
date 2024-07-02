document.addEventListener("DOMContentLoaded", function() {
    let names = ["GreenTech", "Xtreme Wind Power", "Enchanted Villas", "Syndrila AI", "VirgoSoft", "Gemini Automobiles"];
    let name = names[0];
    let initial_investment = 250000;
    let cash_inflows = [100000, 90000, 80000, 70000, 60000];
    let years = 5;
    let r = 0.12;
    let npv;

    function calculateNPV() {
        npv = -initial_investment;
        for (let t = 0; t < years; t++) {
            let cash_inflow = t < cash_inflows.length ? cash_inflows[t] : 0;
            npv += cash_inflow / Math.pow((1 + r), (t + 1));
        }
        return npv;
    }

    function checkAnswers() {
        let user_npv = parseFloat(document.getElementById("npv").value);
        let correct_npv = calculateNPV();
        let feedback = document.getElementById("feedback");

        if (Math.abs(user_npv - correct_npv) < 1) {
            feedback.textContent = "Correct! The NPV is: " + correct_npv.toFixed(2);
            feedback.className = "correct";
        } else {
            feedback.textContent = "Incorrect. The correct NPV is: " + correct_npv.toFixed(2);
            feedback.className = "incorrect";
        }
    }

    function showExplanation() {
        let explanationModal = document.getElementById("explanationModal");
        let explanationContent = explanationModal.querySelector('.content-box');
        explanationContent.innerHTML = ""; // clear previous content

        let explanationText = "<div class='explanation-heading'>How to Solve the Problem...</div>";
        explanationText += "<p>To calculate the Net Present Value (NPV), we discount each expected cash flow by the cost of capital and then subtract the initial investment.</p>";
        explanationText += "<p>The formula for NPV is: NPV = Σ(CFt / (1 + r)^t) - C0</p>";
        explanationText += "<ul>";
        cash_inflows.forEach((cf, t) => {
            explanationText += `<li>Year ${t + 1}: ${cf} / (1 + ${r})^${t + 1} = ${(cf / Math.pow((1 + r), t + 1)).toFixed(2)}</li>`;
        });
        explanationText += "</ul>";
        explanationText += `<p>The sum of discounted cash flows is then subtracted by the initial investment of Rs. ${initial_investment} to find the NPV.</p>`;
        explanationText += `<p>NPV =<span style="color: green; font-weight: bold;"> ${calculateNPV().toFixed(2)}</p>`;

        explanationContent.innerHTML = explanationText; // Set the new content
        explanationModal.style.display = "block"; // Show the modal
    }

    function tryNext() {
        name = names[Math.floor(Math.random() * names.length)];
        initial_investment = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) * 1000;
        years = Math.floor(Math.random() * (15 - 3 + 1) + 3);
        cash_inflows = [];
        for (let i = 0; i < years; i++) {
            cash_inflows.push(Math.floor(Math.random() * (150 - 90 + 1) + 90) * 1000);
        }
        r = Math.floor(Math.random() * (15 - 8 + 1) + 8) / 100;

        document.getElementById("problem").textContent = name + " is considering a project which would require an initial investment of Rs. " + initial_investment.toLocaleString() + ". The project is expected to generate cash flows to the tune of Rs. " + cash_inflows.map(cf => cf.toLocaleString()).join(", Rs. ") + " over the next " + years + " years. The cost of capital is " + (r * 100).toFixed(2) + "%.";
        document.getElementById("npv").value = "";
        document.getElementById("feedback").textContent = "";
        let explanationModal = document.getElementById("explanationModal");
        explanationModal.style.display = "none"; // Hide the modal
    }

    function tryAgain() {
        document.getElementById("npv").value = "";
        document.getElementById("feedback").textContent = "";
        let explanationModal = document.getElementById("explanationModal");
        explanationModal.style.display = "none"; // Hide the modal
    }

    // Event listeners
    document.getElementById("btnSubmit").addEventListener("click", checkAnswers);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", showExplanation);
    document.getElementById("btnNext").addEventListener("click", tryNext);
 
    function hideExplanation() {
        var explanationModal = document.getElementById("explanationModal");
        if (explanationModal) {
            explanationModal.style.display = "none";
        } else {
            console.error('Explanation modal not found');
        }
    }

    // Correctly select the close button and add the event listener
    var closeButton = document.querySelector('.modal .close');
    if (closeButton) {
        closeButton.addEventListener('click', hideExplanation);
    } else {
        console.error('Close button not found');
    }

    // Add event listener for the close button within the modal
    document.querySelector('.modal .close').addEventListener('click', hideExplanation);

    // Close the modal when the close button is clicked
    // document.querySelector('.modal .close').addEventListener('click', function() {
    //     let explanationModal = document.getElementById("explanationModal");
    //     explanationModal.style.display = "none"; // Hide the modal
  
});
