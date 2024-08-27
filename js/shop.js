// Cargar los datos de los campeones desde champions.json
function loadChampions(callback) {
    fetch('data/champions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo champions.json');
            }
            return response.json();
        })
        .then(data => {
            callback(data.champions);
        })
        .catch(error => console.error('Error en loadChampions:', error));
}

// Generar campeones en la tienda basados en el nivel del jugador y las probabilidades configuradas
function generateShop(champions) {
    let shopChampions = [];
    
    // Obtener las probabilidades desde config.json
    fetch('data/config.json')
        .then(response => response.json())
        .then(config => {
            const levelConfig = config.level_probabilities[playerData.level];

            for (let i = 0; i < 5; i++) { // Generar hasta 5 campeones
                const rand = Math.random();
                let chosenCost;

                if (rand < levelConfig.cost_1) {
                    chosenCost = 1;
                } else if (rand < levelConfig.cost_1 + levelConfig.cost_2) {
                    chosenCost = 2;
                } else if (rand < levelConfig.cost_1 + levelConfig.cost_2 + levelConfig.cost_3) {
                    chosenCost = 3;
                } else if (rand < levelConfig.cost_1 + levelConfig.cost_2 + levelConfig.cost_3 + levelConfig.cost_4) {
                    chosenCost = 4;
                } else {
                    chosenCost = 5;
                }

                const availableChampions = champions.filter(c => c.cost === chosenCost);
                const randomChampion = availableChampions[Math.floor(Math.random() * availableChampions.length)];
                shopChampions.push(randomChampion);
            }

            displayShopChampions(shopChampions);
        })
        .catch(error => console.error('Error al generar la tienda:', error));
}

// Mostrar los campeones generados en la tienda dentro del DOM
function displayShopChampions(shopChampions) {
    const shopContainer = document.getElementById('shop-champions');
    shopContainer.innerHTML = ''; // Limpia el contenedor de la tienda

    shopChampions.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}">
            <h3>${champion.name}</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}></p>
            <button onclick="buyChampion('${champion.name}')">Comprar</button>
        `;
        shopContainer.appendChild(card);
    });
}

// Función principal que se encarga de reiniciar la tienda cuando el jugador hace clic en "Refrescar Tienda"
function rollShop() {
    loadChampions(generateShop);
}
function buyChampion(championName) {
    const champion = champions.find(c => c.name === championName);

    if (!champion) {
        console.error(`Campeón con nombre ${championName} no encontrado.`);
        return;
    }

    if (playerData.gold >= champion.cost) {
        spendGold(champion.cost);
        addChampionToBench(champion);
        rollShop();
    } else {
        console.log("No tienes suficiente oro para comprar este campeón.");
    }
}

