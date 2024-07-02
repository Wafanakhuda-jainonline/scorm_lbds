document.addEventListener("DOMContentLoaded", function() {

    const products = [
        { name: "smartphone", costPrice: 300, markupPercentage: 40, retailer: "ABC Electronics" },
        { name: "laptop", costPrice: 500, markupPercentage: 30, retailer: "Tech Solutions" },
        { name: "tablet", costPrice: 200, markupPercentage: 25, retailer: "Gadget World" },
        { name: "headphones", costPrice: 150, markupPercentage: 50, retailer: "Music Mania" },
        { name: "e-reader", costPrice: 250, markupPercentage: 35, retailer: "Readers' Haven" },
        { name: "smartwatch", costPrice: 220, markupPercentage: 45, retailer: "Time Keepers" },
        { name: "desktop computer", costPrice: 700, markupPercentage: 20, retailer: "Computing Central" },
        { name: "camera", costPrice: 450, markupPercentage: 30, retailer: "Shutterbugs" },
        { name: "portable speaker", costPrice: 100, markupPercentage: 60, retailer: "Sound Waves" },
        { name: "gaming console", costPrice: 350, markupPercentage: 33, retailer: "Gamers' Galore" },
        { name: "external hard drive", costPrice: 120, markupPercentage: 40, retailer: "Storage Solutions" },
        { name: "wireless mouse", costPrice: 80, markupPercentage: 55, retailer: "Tech Gear" },
        // Add more products as needed
    ];
    
    // Initialize with dummy values or retrieve from localStorage
    let currentProductIndex = 0; // Initialize index for the first product
    let expectedSellingPrice;
    // Function to calculate and update expected selling price
    function updateExpectedSellingPrice() {
        const product = products[currentProductIndex];
        expectedSellingPrice = product.costPrice + (product.costPrice * (product.markupPercentage / 100));
    }

    function updateProblemDescription() {
        const product = products[currentProductIndex];
        document.getElementById('problemDescription').innerText = `${product.retailer} sells electronic gadgets and uses a markup pricing strategy. The store manager wants to set the selling price for a new ${product.name}. The store's policy is to apply a ${product.markupPercentage}% markup on the cost price. (Assuming the cost price is $${product.costPrice}).`;
    }


    function generateValues() {
        // Select a new product index randomly
        currentProductIndex = Math.floor(Math.random() * products.length);
        updateExpectedSellingPrice();
        updateProblemDescription();
    }


 

    document.getElementById('btnSubmit').addEventListener('click', function() {
        const userAnswer = parseFloat(document.getElementById('answer').value);
        const feedback = document.getElementById('feedback');
        const isCorrect = Math.abs(userAnswer - expectedSellingPrice) < 0.1; // Allow for a small margin of error

        if (isCorrect) {
            feedback.innerHTML = '<span class="correct">Correct. You can click EXPLAIN to receive an explanation of how to solve the problem. You can click NEXT to practice solving another problem.</span>';
            feedback.style.color = 'green';
        } else {
            feedback.innerHTML = '<span class="incorrect">Incorrect Answer. Try Again.</span>';
            feedback.style.color = 'red';
        }
    });

    document.getElementById('btnTryAgain').addEventListener('click', function() {
        document.getElementById('answer').value = '';
        document.getElementById('feedback').textContent = '';
    });

    document.getElementById('btnExplain').addEventListener('click', function() {
        const explanation = generateExplanation(document.getElementById('answer').value);
        const modalContent = document.querySelector('.modal .content-box');
        modalContent.innerHTML = explanation;
        document.getElementById('explanationModal').style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('explanationModal').style.display = 'none';
    });

    // Generate and display initial values
    updateExpectedSellingPrice();
    updateProblemDescription();

    document.getElementById('btnNext').addEventListener('click', function() {
        generateValues();
        updateProblemDescription();
        document.getElementById('answer').value = '';
        document.getElementById('feedback').textContent = '';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('explanationModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Additional helper function for generating explanations - remains unchanged
    function generateExplanation() {
        const product = products[currentProductIndex];
        const markupAmount = product.costPrice * (product.markupPercentage / 100);
        const sellingPrice = product.costPrice + markupAmount;
    
        return `
            <h2>Explanation</h2>
            <p>Selling Price = Cost Price + (Cost Price × Markup Percentage)</p>
            <p>Assuming the cost price of the ${product.name} is $${product.costPrice}:</p>
            <p>Selling Price = $${product.costPrice} + ($${product.costPrice} × ${product.markupPercentage / 100})</p>
            <p>Selling Price = $${product.costPrice} + $${markupAmount.toFixed(2)}</p>
            <p>Selling Price = $${sellingPrice.toFixed(2)}</p>
            <p>Therefore, the selling price using a <span class="correct"> ${product.markupPercentage}% </span>markup on the cost price would be <span class="correct"> $${sellingPrice.toFixed(2)}</span>.</p>
        `;
    }
    
    
        document.getElementById('btnExplain').addEventListener('click', function() {
            const userAnswer = parseFloat(document.getElementById('answer').value) || 0;
            const explanation = generateExplanation(userAnswer);
            const modalContent = document.querySelector('.modal .content-box');
            modalContent.innerHTML = explanation;
            document.getElementById('explanationModal').style.display = 'block';
        });
    
        document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('explanationModal').style.display = 'none';
        });
    
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('explanationModal');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    
        // Initialize with the first product details
        updateExpectedSellingPrice();
        updateProblemDescription();
    });
    
