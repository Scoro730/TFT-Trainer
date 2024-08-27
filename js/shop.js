let shopChampions = [];
const shopSize = 5; // Número de campeones que aparecerán en la tienda

function rollShop() {
    loadChampions((champions) => {
        shopChampions = [];

        // Selecciona campeones aleatoriamente para la tienda
        for (let i = 0; i < shopSize; i++) {
            const randomIndex = Math.floor(Math.random() * champions.length);
            shopChampions.push(champions[randomIndex]);
        }

        displayShopChampions();
    });
}

function displayShopChampions() {
    const shopContainer = document.getElementById('shop-champions');
    shopContainer.innerHTML = '';

    shopChampions.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}">
            <h3>${champion.name}</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}</p>
            <button onclick="buyChampion('${champion.name}')">Buy</button>
        `;
        shopContainer.appendChild(card);
    });
}

function buyChampion(championName) {
    const champion = shopChampions.find(c => c.name === championName);
    if (champion) {
        // Aquí podrías implementar la lógica para mover el campeón al banco
        console.log(`Bought ${champion.name}`);
    }
}

// Inicializa la tienda al cargar la página
document.addEventListener('DOMContentLoaded', rollShop);
