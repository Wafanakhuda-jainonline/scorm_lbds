document.addEventListener("DOMContentLoaded", function() {
    
    var data = [
        { month: "Jan", start: 800, joined: 20, left: 10 },
        { month: "Feb", start: 810, joined: 25, left: 15 },
        { month: "Mar", start: 820, joined: 30, left: 20 },
        { month: "Apr", start: 830, joined: 30, left: 25 },
        { month: "May", start: 835, joined: 35, left: 30 },
        { month: "Jun", start: 840, joined: 30, left: 25 },
        { month: "Jul", start: 845, joined: 35, left: 30 },
        { month: "Aug", start: 850, joined: 35, left: 35 },
        { month: "Sep", start: 850, joined: 40, left: 40 },
        { month: "Oct", start: 850, joined: 40, left: 45 },
        { month: "Nov", start: 845, joined: 35, left: 40 },
        { month: "Dec", start: 840, joined: 35, left: 40 }
    ];
    
    function calculateTurnover(data) {
        var totalLeft = data.reduce(function(sum, month) {
            return sum + month.left;
        }, 0);
        var totalAvgEmployees = data.reduce(function(sum, month) {
            var avgEmployees = (month.start + month.start + month.joined) / 2;
            return sum + avgEmployees;
        }, 0);
        return totalLeft / (totalAvgEmployees / 12) * 100;
    }
    
    var correctAnswer = calculateTurnover(data).toFixed(1);
    
    function createDataTable() {
        var table = "<table><tr><th>Month</th><th>Employees at Start of Month</th><th>Employees Joined</th><th>Employees Left</th></tr>";
        data.forEach(function(month) {
            table += `<tr><td>${month.month}</td><td>${month.start}</td><td>${month.joined}</td><td>${month.left}</td></tr>`;
        });
        document.getElementById('data-table').innerHTML = table;
    }
    
    createDataTable();
    
    function createExplanation() {
       
        var explanation = "<table><tr><th>Month</th><th>Employees at Start of Month</th><th>Employees Joined</th><th>Employees Left</th><th>Average Number of Employees Each Month</th></tr>";
        var totalAvg = 0;
        var totalLeft = 0;
        data.forEach(function(month) {
            var avg = (month.start + month.start + month.joined) / 2;
            totalAvg += avg;
            totalLeft += month.left;
            explanation += `<tr><td>${month.month}</td><td>${month.start}</td><td>${month.joined}</td><td>${month.left}</td><td>${avg.toFixed(1)}</td></tr>`;
        });
        var avgOfAvg = totalAvg / 12;
        explanation += `<tr><td>Total</td><td></td><td></td><td>${totalLeft}</td><td>${totalAvg.toFixed(1)}</td></tr>`;
        explanation += `<tr><td colspan="5">Average of Monthly Averages: ${avgOfAvg.toFixed(1)}</td></tr>`;
        explanation += `<tr><td colspan="5">Annual Employee Turnover Rate: ${totalLeft} / ${avgOfAvg.toFixed(1)} =<span class="correct"> ${(totalLeft / avgOfAvg * 100).toFixed(1)}%</td></tr>`;
    
        var modalContentBox = document.querySelector('#explanationModal .content-box');
        modalContentBox.innerHTML = explanation;
    }
    
    function submitAnswer() {
        var answer = document.getElementById('answer').value;
        var feedback = document.getElementById('feedback');
        if(answer === correctAnswer) {
            feedback.className = 'feedback-message';
            feedback.style.color = "green";
            
            feedback.textContent = "Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.";
            document.getElementById("explanation").innerHTML = "";
        } else {
            feedback.className = 'feedback-message';
            feedback.style.color = "red";
            feedback.textContent = "Incorrect. Try Again.";
            createExplanation();
        }
    }
    
    function generateNewData() {
        for(var i = 0; i < data.length; i++) {
            var start = Math.round(Math.random() * 200 + 800);
            var joined = Math.round(Math.random() * 20 + 20);
            var left = Math.round(Math.random() * 20 + 10);
            data[i].start = i === 0 ? start : data[i-1].start + data[i-1].joined - data[i-1].left;
            data[i].joined = data[i].start > left ? joined : data[i].start / 2;
            data[i].left = data[i].start > left ? left : data[i].start / 2;
        }
        correctAnswer = calculateTurnover(data).toFixed(1);
        createDataTable();
        document.getElementById('answer').value = "";
        document.getElementById('feedback').textContent = "";
        document.getElementById('explanation').innerHTML = "";
    }
    function explain() {
        createExplanation();
        document.getElementById('explanationModal').style.display = 'block';
    }
    function tryAgain() {
        document.getElementById('answer').value = "";
        document.getElementById('feedback').textContent = "";
        document.getElementById('explanation').style.display = 'none';
        document.getElementById('explanationModal').style.display = 'none';
    }

    function hideExplanation() {
        const explanationModal = document.getElementById('explanationModal');
        explanationModal.style.display = 'none';
    }

    document.querySelector('.close').addEventListener('click', hideExplanation);

    document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
    document.getElementById("btnTryAgain").addEventListener("click", tryAgain);
    document.getElementById("btnExplain").addEventListener("click", explain);
    document.getElementById("btnNext").addEventListener("click", generateNewData);
});