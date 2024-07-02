document.addEventListener("DOMContentLoaded", function() {
    const problems = [
        { jobSatisfaction: 4.2, communication: 3.8, workLifeBalance: 4.0 },
        { jobSatisfaction: 3.5, communication: 4.0, workLifeBalance: 3.7 },
        { jobSatisfaction: 3.5, communication: 2.5, workLifeBalance: 3.4 },
        { jobSatisfaction: 4.5, communication: 4.3, workLifeBalance: 4.9 },
        { jobSatisfaction: 4.5, communication: 5.0, workLifeBalance: 4.5 },
        { jobSatisfaction: 4.5, communication: 4.0, workLifeBalance: 4.0 },
        { jobSatisfaction: 4.0, communication: 3.5, workLifeBalance: 3.5 }, 
        { jobSatisfaction: 4.8, communication: 4.8, workLifeBalance: 4.5 },
        { jobSatisfaction: 4.5, communication: 4.2, workLifeBalance: 3.9 },
        { jobSatisfaction: 2.5, communication: 2.5, workLifeBalance: 2.7 },
        { jobSatisfaction: 5.0, communication: 5.0, workLifeBalance: 4.7 },
        { jobSatisfaction: 4.5, communication: 4.7, workLifeBalance: 4.5 },
        { jobSatisfaction: 4.5, communication: 4.4, workLifeBalance: 4.0 },
        { jobSatisfaction: 4.0, communication: 3.5, workLifeBalance: 3.5 }
    ];

    var currentProblemIndex = 0;

    document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", explain);
    document.getElementById("btnNext").addEventListener("click", next);
    document.querySelector(".modal-content .close").addEventListener("click", function() {
        document.getElementById("explanationModal").style.display = "none";
    });

    function generateNewProblem() {
        var currentProblem = problems[currentProblemIndex];
        document.getElementById("problemdescription").innerHTML =
            `<p>A company conducted an employee engagement survey with 1000 employees. The survey included questions on various aspects such as job satisfaction, communication, and work-life balance. Each question was rated on a scale from 1 to 5, with 1 being the lowest and 5 being the highest level of satisfaction.</p>
             <ul>
                 <li>Job Satisfaction: ${currentProblem.jobSatisfaction}</li>
                 <li>Communication: ${currentProblem.communication}</li>
                 <li>Work-Life Balance: ${currentProblem.workLifeBalance}</li>
             </ul>`;
    }

    function calculateOverallAverage() {
        var currentProblem = problems[currentProblemIndex];
        return ((currentProblem.jobSatisfaction + currentProblem.communication + currentProblem.workLifeBalance) / 3).toFixed(2);
    }

    function submitAnswer() {
        var userAnswer = document.getElementById('answer').value.trim();
        var correctAnswer = calculateOverallAverage();
    
        // Normalize the user input by converting it to a number and formatting it to two decimal places like the correct answer
        userAnswer = parseFloat(userAnswer).toFixed(2);
    
        if (userAnswer === correctAnswer) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    }

    function tryAgain() {
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerHTML = '';
    }

    function explain() {
        var correctAnswer = calculateOverallAverage(); 
        var scores = [problems[currentProblemIndex].jobSatisfaction, problems[currentProblemIndex].communication, problems[currentProblemIndex].workLifeBalance]; 
        
        var explanation = '<h3 class="explanation-title">How to Solve the Problem:</h3>';
        explanation += '<ol class="explanation-steps">';
        explanation += '<li>Add the scores for Job Satisfaction, Communication, and Work-Life Balance.</li>';
        explanation += `<li>Divide the sum by the number of categories (3 in this case).</li>`;
        explanation += '</ol>';
        explanation += '<p class="formula">Formula: <strong>Overall Average = (Job Satisfaction + Communication + Work-Life Balance) / 3</strong></p>';
        explanation += `<p class="calculation">Calculation: (${scores.join(' + ')}) / 3 = <span class="correct"> ${correctAnswer} </span></p>`;
        explanation += `<p> Overall average Employee Engagement Score for the Company based on these three categories is <span class="correct"> ${correctAnswer}</span></p>`;

        document.querySelector('#explanationModal .content-box').innerHTML = explanation;
        document.getElementById('explanationModal').style.display = 'block';
        }
    
    function next() {
        currentProblemIndex = (currentProblemIndex + 1) % problems.length;
        generateNewProblem();
        tryAgain();
    }

    // Initialize the first problem
    generateNewProblem();
});
