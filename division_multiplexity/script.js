document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.getElementById('btnSubmit');
    const btnTryAgain = document.getElementById('btnTryAgain');
    const btnExplain = document.getElementById('btnExplain');
    const btnNext = document.getElementById('btnNext');
    const inputAnswer = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const explanationModal = document.getElementById('explanationModal');

    // Initial problem description
    const initialProblemDescription = `Calculate the Minimum bandwidth needed for a path utilizing Frequency Division Multiplexing (FDM) with 5 devices, each demanding 4000 Hz, and an additional 200 Hz guard band for every device to prevent interference. The solution involves determining the total bandwidth, considering the number of devices and guard bands.`;

    // Initially set problem parameters
    let devices = 5;
    let deviceBandwidth = 4000; // Hz (constant)
    let guardBand = 200; // Hz (constant)
    let correctAnswer = calculateBandwidth(devices, deviceBandwidth, guardBand); // In Hz

    // Update problem description text
    document.getElementById('problemDescription').textContent = initialProblemDescription;

    function calculateBandwidth(devices, deviceBandwidth, guardBand) {
        return (deviceBandwidth + guardBand) * devices;
    }

    btnSubmit.addEventListener('click', function () {
        let userAnswer = parseFloat(inputAnswer.value);
        // Convert kHz to Hz if necessary
        if (inputAnswer.value.toLowerCase().includes('khz')) {
            userAnswer *= 1000; // Convert to Hz
        }
    
        if (userAnswer === correctAnswer) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    });
    

    btnTryAgain.addEventListener('click', function () {
        inputAnswer.value = '';
        feedback.textContent = '';
    });

  btnExplain.addEventListener('click', function () {
    explanationModal.style.display = "block";

    let explanation = `
        <div class="explanation-heading">Explanation</div>
        <div class="content-box">
            <p>The total bandwidth required can be calculated with the following steps:</p>
            <ul>
                <li>First, add the device's bandwidth (${deviceBandwidth} Hz) to the guard band (${guardBand} Hz).</li>
                <li>Then, multiply the result by the number of devices (${devices}).</li>
                <li>This gives the formula: <strong>Total Bandwidth = (${deviceBandwidth} Hz + ${guardBand} Hz) * ${devices}</strong>.</li>
                <li>Applying the values: <strong>Total Bandwidth = (${deviceBandwidth} + ${guardBand}) * ${devices} = <span style="color: green">${correctAnswer} Hz</span></strong> or <strong><span style="color: green">${correctAnswer / 1000} kHz</strong></span>.</li>
            </ul>
            <p>This calculation shows that answers in both Hz and kHz are accepted, as long as they represent the correct value.</p>
        </div>
    `;

    explanationModal.querySelector('.modal-content').innerHTML = explanation;

});




    btnNext.addEventListener('click', function () {
        // Generate new values randomly
        devices = Math.floor(Math.random() * 5) + 3; // between 3 and 7 devices
        deviceBandwidth = Math.floor(Math.random() * 4) * 1000 + 2000; // between 2000 and 6000 Hz, multiple of 1000
        guardBand = Math.floor(Math.random() * 2) * 100 + 100; // between 100 and 300 Hz, multiple of 100
        correctAnswer = calculateBandwidth(devices, deviceBandwidth, guardBand);

        // Update problem description text and explanation with new values
        document.getElementById('problemDescription').textContent = `Calculate the Minimum bandwidth needed for a path utilizing Frequency Division Multiplexing (FDM) with ${devices} devices, each demanding ${deviceBandwidth} Hz, and an additional ${guardBand} Hz guard band for every device to prevent interference. The solution involves determining the total bandwidth, considering the number of devices and guard bands.`;

        // Reset input and feedback
        inputAnswer.value = '';
        feedback.textContent = '';
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = "none";
    });
    
});
