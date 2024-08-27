// Variables Globales
let playerData = {
    name: "",
    icon: "",
    level: 1,
    xp: 0,
    gold: 0
};

// Inicializar los datos del jugador desde config.json
function initPlayer() {
    fetch('data/config.json')
        .then(response => response.json())
        .then(data => {
            playerData.name = data.default_player.name;
            playerData.icon = `resources/images/${data.default_player.icon}`;
            playerData.level = data.default_player.level;
            playerData.xp = data.default_player.xp;
            playerData.gold = data.default_player.gold;
            updatePlayerInfo();
        })
        .catch(error => console.error('Error al cargar la configuración del jugador:', error));
}


// Actualizar la información del jugador en el DOM
function updatePlayerInfo() {
    document.getElementById('player-name').textContent = playerData.name;
    document.getElementById('player-icon').src = playerData.icon;
    document.getElementById('player-level').textContent = `Level: ${playerData.level}`;
    document.getElementById('player-xp').textContent = `XP: ${playerData.xp}`;
    document.getElementById('player-gold').textContent = `Gold: ${playerData.gold}`;
}

// Aumentar la experiencia y verificar si sube de nivel
function increaseXP(amount) {
    playerData.xp += amount;
    checkLevelUp();
    updatePlayerInfo();
}

// Verificar si el jugador sube de nivel
function checkLevelUp() {
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            const xpToLevelUp = data.xp_to_level_up[playerData.level];
            if (playerData.xp >= xpToLevelUp) {
                playerData.level += 1;
                playerData.xp -= xpToLevelUp;
                console.log(`¡Has subido al nivel ${playerData.level}!`);
                updatePlayerInfo();
            }
        })
        .catch(error => console.error('Error al verificar el nivel:', error));
}

// Añadir oro al jugador
function earnGold(amount) {
    playerData.gold += amount;
    updatePlayerInfo();
}

// Gastar oro si el jugador tiene suficiente
function spendGold(amount) {
    if (playerData.gold >= amount) {
        playerData.gold -= amount;
        updatePlayerInfo();
        return true;
    } else {
        console.log("No tienes suficiente oro.");
        return false;
    }
}

// Función de depuración: Reiniciar a valores predeterminados
function resetPlayer() {
    initPlayer(); // Reinitialize the player data
    console.log("Datos del jugador reiniciados a los valores predeterminados.");
}

// Funciones de depuración para añadir botones que otorgan XP y oro
function debugButtons() {
    const giveXPButton = document.createElement('button');
    giveXPButton.textContent = "Dar XP";
    giveXPButton.onclick = () => increaseXP(5);
    document.body.appendChild(giveXPButton);

    const giveGoldButton = document.createElement('button');
    giveGoldButton.textContent = "Dar Oro";
    giveGoldButton.onclick = () => earnGold(5);
    document.body.appendChild(giveGoldButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = "Reiniciar a por defecto";
    resetButton.onclick = resetPlayer;
    document.body.appendChild(resetButton);
}

// Llamar a initPlayer al cargar la página
document.addEventListener('DOMContentLoaded', initPlayer);
