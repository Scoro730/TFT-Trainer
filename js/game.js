let champions = [];  // Define champions como un array vacío

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
            champions = data.champions;  // Asigna los datos cargados a la variable champions
            if (callback) callback();
        })
        .catch(error => console.error('Error en loadChampions:', error));
}

// Llama a loadChampions al iniciar el juego
document.addEventListener('DOMContentLoaded', () => {
    loadChampions(() => {
        // Una vez cargados los campeones, puedes inicializar el juego
        startGame();
    });
});

function startGame() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    displayPlayerInfo();
    initBench();  // Inicializa el banco con el campeón por defecto
    initShop();
    initField();

    rollShop();
}


function displayPlayerInfo() {
    const gameContainer = document.getElementById('game');

    // Verifica si el contenedor ya existe para evitar duplicaciones
    let playerInfoContainer = document.getElementById('player-info');
    if (!playerInfoContainer) {
        playerInfoContainer = document.createElement('div');
        playerInfoContainer.id = 'player-info';
        playerInfoContainer.innerHTML = `
            <div>
                <img id="player-icon" src="${playerData.icon}" alt="Player Icon" style="width: 50px; height: 50px;">
                <h3 id="player-name">${playerData.name}</h3>
            </div>
            <p id="player-level">Level: ${playerData.level}</p>
            <p id="player-xp">XP: ${playerData.xp}</p>
            <p id="player-gold">Gold: ${playerData.gold}</p>

            <!-- Botones de depuración -->
            <button onclick="increaseXP(10)">Aumentar XP</button>
            <button onclick="earnGold(10)">Aumentar Oro</button>
            <button onclick="levelUp()">Aumentar Nivel</button>
            <button onclick="resetPlayer()">Reiniciar a por defecto</button>
        `;
        gameContainer.prepend(playerInfoContainer);
    }
}
  
function initShop() {
    const shopContainer = document.createElement('div');
    shopContainer.id = 'shop-container';
    shopContainer.innerHTML = `
        <h2>Tienda</h2>
        <div id="shop-champions" class="champions-container"></div>
        <button onclick="rollShop()">Refrescar Tienda</button>
    `;
    document.getElementById('game').appendChild(shopContainer);
}

function initBench() {
    const benchContainer = document.createElement('div');
    benchContainer.id = 'bench-container';
    benchContainer.innerHTML = `
        <h2>Banco</h2>
        <div id="bench-champions" class="champions-container"></div>
    `;
    document.getElementById('game').appendChild(benchContainer);
}

function initField() {
    const fieldContainer = document.createElement('div');
    fieldContainer.id = 'field-container';
    fieldContainer.innerHTML = `
        <h2>Campo</h2>
        <div id="field-champions" class="champions-container"></div>
    `;
    document.getElementById('game').appendChild(fieldContainer);
}

function updatePlayerInfo() {
    document.getElementById('player-name').textContent = playerData.name;
    document.getElementById('player-icon').src = playerData.icon;
    document.getElementById('player-level').textContent = `Level: ${playerData.level}`;
    document.getElementById('player-xp').textContent = `XP: ${playerData.xp}`;
    document.getElementById('player-gold').textContent = `Gold: ${playerData.gold}`;
}
