// Function to fetch and display cards
async function displayCards() {
    try {
        const response = await fetch('cards.json');  // Fetch card data from JSON
        const cards = await response.json();  // Parse the JSON data
        const cardList = document.getElementById('card-list');  // Get the container for the cards

        // Loop through each card in the JSON data
        cards.forEach(card => {
            // Create card div
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');  // Add class for styling
            if (card.shiny) cardDiv.classList.add('shiny');  // Add shiny class if the card is shiny
            
            // Card image
            const img = document.createElement('img');
            img.src = card.image;  // Use the image URL from the card object
            img.alt = card.name;   // Set alt text for the image
            
            // Handle case where image URL is missing or broken
            img.onerror = function() {
                img.src = 'fallback-image.jpg';  // Optional: Set a fallback image URL
            };
            cardDiv.appendChild(img);  // Add the image to the card div
            
            // Card title
            const title = document.createElement('div');
            title.classList.add('card-title');
            title.innerText = card.name;  // Set the card name as the title
            cardDiv.appendChild(title);  // Add the title to the card div

            // Card price
            const price = document.createElement('div');
            price.classList.add('card-price');

            // Check if price exists and is a number before formatting
            if (card.price !== undefined && !isNaN(card.price)) {
                // Use toFixed(2) to ensure the price is displayed with two decimal places
                price.innerText = `$${card.price.toFixed(2)}`;  // Format price with two decimal places and a dollar sign
            } else {
                // Set a default value or display message if price is missing
                price.innerText = 'Price not available';
            }
            cardDiv.appendChild(price);  // Add the price to the card div

            // Add click event to navigate to individual card page
            cardDiv.onclick = function() {
                // Generate a URL-friendly version of the card name
                window.location.href = `${card.name.replace(/\s+/g, '-').toLowerCase()}.html`;
            };

            cardList.appendChild(cardDiv);  // Add the card to the list in the DOM
        });
    } catch (error) {
        console.error('Error loading the cards:', error);  // Log any errors that occur during fetch
    }
}

// Initialize cards on page load
window.onload = displayCards;


