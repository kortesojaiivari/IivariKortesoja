// Pricing script to manage styles, visibility, and functionalities dynamically.

const pricingData = [
    { type: 'Basic', price: 10, features: ['Feature 1', 'Feature 2'] },
    { type: 'Standard', price: 20, features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { type: 'Premium', price: 30, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] }
];

const pricingContainer = document.getElementById('pricing');

function renderPricing() {
    pricingContainer.innerHTML = '';
    pricingData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pricing-card';
        card.style.transition = 'all 0.3s ease';
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '8px';
        card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        card.style.padding = '20px';
        card.style.margin = '10px';
        
        const title = document.createElement('h3');
        title.innerText = item.type;
        card.appendChild(title);

        const price = document.createElement('p');
        price.innerText = `$${item.price}`;
        card.appendChild(price);

        const featureList = document.createElement('ul');
        item.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerText = feature;
            featureList.appendChild(li);
        });
        card.appendChild(featureList);

        pricingContainer.appendChild(card);
    });
}

// Initial render
renderPricing();

// For dynamic updates in future
// Example: pricingData.push(newPricing);
// renderPricing();
