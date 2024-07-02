document.addEventListener("DOMContentLoaded", function() {
    const companyNames = [
        "ABC Limited", "XYZ Corp", "Quantum Industries", "GigaTech", "Delta Electronics",
        "Orion Solutions", "Nova Imports", "Galactic Enterprises", "Eclipse Textiles", "Terra Manufacturing"
    ];

    const projectNames = [
        "Project Quest", "Dragon Code", "Wizard's Interface", "Elf Networks", "Goblin Algorithms"
    ];

    const narratives = [
        "In the mystical kingdom of Codeonia", 
        "In the enchanted realm of Scriptland", 
        "In the legendary world of Computationa",
        "In the ancient empire of Codexia",
        "In the magical province of Programatica"
    ];

    let correctAnswer, currentCompany, currentProject, currentNarrative, estimatedHours, teamSize, standardWorkweek;

    function calculateCorrectAnswer() {
        estimatedHours = Math.floor(Math.random() * 16 + 10) * 100;  // 16 possible 100 increments between 1000 (10*100) and 2500 (25*100)

        // Random team size between 3 and 10
        teamSize = Math.floor(Math.random() * 8 + 3);  // 8 possible values from 3 to 10
    
        standardWorkweek = 40;                                   // Standard hours per week per person
        correctAnswer = Math.ceil(estimatedHours / (teamSize * standardWorkweek)).toString();
        currentProject = projectNames[Math.floor(Math.random() * projectNames.length)];
        currentNarrative = narratives[Math.floor(Math.random() * narratives.length)];
        updateProblemDescription();
    }

    function updateProblemDescription() {
        currentCompany = companyNames[Math.floor(Math.random() * companyNames.length)];
        let problemDescription = document.getElementById("problemDescription");
        problemDescription.innerHTML = `${currentNarrative}, ${currentCompany} embarks on a quest to complete a magical software project known as "${currentProject}." The Oracle has estimated that the project will require ${estimatedHours} person-hours for completion. The team, consisting of ${teamSize} skilled developers, is eager to determine the duration of their quest.`;
    }

    function submitAnswer() {
     
            let userAnswer = document.getElementById("answer").value.trim();

            // Convert user input into a number (floating-point as necessary)
            let numericAnswer = parseFloat(userAnswer);

            // Check if the user input is not a number
            if (isNaN(numericAnswer)) {
                document.getElementById("feedback").innerHTML = "Please enter a valid number.";
                document.getElementById("feedback").style.color = "red";
                return;
            }

            // Fetch the correct answer, assuming correctAnswer is globally accessible and calculated elsewhere
            let correctNumericAnswer = parseFloat(correctAnswer);
            let roundedCorrectAnswer = Math.round(correctNumericAnswer);

            // Fetch the feedback element
            let feedback = document.getElementById("feedback");

            // Check if the user's answer matches either the exact or rounded correct answer
            if (numericAnswer === correctNumericAnswer || numericAnswer === roundedCorrectAnswer) {
                
                    feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
                    feedback.style.color = 'green';
                } else {
                    feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
                    feedback.style.color = 'red';
                }
            }

    function tryAgain() {
        document.getElementById("answer").value = "";
        document.getElementById("feedback").innerHTML = "";
        document.getElementById("feedback").style.color = ""; // Reset feedback color to default
    }

    function explain() {
        let explanationElement = document.getElementById("explanationModal");
        explanationElement.querySelector('.content-box').innerHTML = `
            <p>To calculate the time spell unveiled, you first determine the total person-hours required. For ${currentCompany} and ${currentProject}, the required person-hours are ${estimatedHours}. With ${teamSize} developers working a standard ${standardWorkweek}-hour week, the duration is calculated as follows:<br><br>
            Total Time = Total Person-Hours / (Team Size * Standard Workweek)<br>
            Total Time = ${estimatedHours} / (${teamSize} * ${standardWorkweek})<br>
            Total Time = <span class="correct">${correctAnswer} weeks</span></p>`;
            explanationElement.style.display = "block";
    }

    function next() {
        calculateCorrectAnswer();
        tryAgain();  // Clear existing inputs and feedback
    }
    document.querySelector('.modal-content .close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnTryAgain').addEventListener('click', tryAgain);
    document.getElementById('btnExplain').addEventListener('click', explain);
    document.getElementById('btnNext').addEventListener('click', next);

    // Initial calculation and update
    calculateCorrectAnswer();
});












