const bench = [];  // Array para almacenar los campeones en el banco
const BENCH_LIMIT = 6;  // Límite máximo de campeones en el banco

// Función para iniciar el banco con un campeón por defecto
function initBench() {
    const defaultChampion = {
        id: Date.now(),
        name: "Garen",
        cost: 1,
        class: ["Knight"],
        origin: ["Noble"],
        tier: 1,
        image: "garen.png"
    };
    addChampionToBench(defaultChampion);
    displayBench();
}

// Función para agregar un campeón al banco
function addChampionToBench(champion) {
    if (isBenchFull()) {
        alert("El banco está lleno. Vende un campeón para hacer espacio.");
        return;
    }

    bench.push(champion);
    checkForFusion(champion.name);  // Verifica si se puede realizar una fusión
    displayBench();
}

// Verifica si el banco está lleno
function isBenchFull() {
    return bench.length >= BENCH_LIMIT;
}

// Mostrar los campeones en el banco en el DOM
function displayBench() {
    const benchContainer = document.getElementById('bench-champions');
    benchContainer.innerHTML = ''; // Limpia el contenido actual

    bench.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.innerHTML = `
            <img src="resources/champions/${champion.image}" alt="${champion.name}">
            <h3>${champion.name} (Tier ${champion.tier})</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}></p>
            <button onclick="sellChampion(${champion.id})">Vender</button>
        `;
        benchContainer.appendChild(card);
    });
}

// Función para vender un campeón del banco
function sellChampion(championId) {
    const championIndex = bench.findIndex(c => c.id === championId);
    if (championIndex === -1) {
        console.error(`Campeón con ID ${championId} no encontrado en el banco.`);
        return;
    }

    const champion = bench[championIndex];
    bench.splice(championIndex, 1);  // Elimina el campeón del array del banco

    // Devuelve un porcentaje del coste original al jugador (100% en este caso)
    earnGold(champion.cost);

    displayBench();  // Actualiza el banco en el DOM
}

// Función genérica para eliminar campeones del banco
function removeChampionFromBench(championId) {
    const championIndex = bench.findIndex(c => c.id === championId);
    if (championIndex !== -1) {
        bench.splice(championIndex, 1);  // Elimina el campeón del array del banco
        displayBench();  // Actualiza el banco en el DOM
    }
}

// Función para verificar y manejar la fusión de campeones
function checkForFusion(championName) {
    const matchingChampions = bench.filter(c => c.name === championName && c.tier === 1);
    if (matchingChampions.length === 3) {
        const baseChampion = matchingChampions[0];

        // Eliminar los tres campeones originales
        matchingChampions.forEach(champion => removeChampionFromBench(champion.id));

        // Crear un campeón de tier 2
        const fusedChampion = {
            ...baseChampion,
            id: Date.now(),  // Genera un nuevo ID único
            tier: 2  // Incrementa el tier
        };

        // Agregar el nuevo campeón fusionado al banco
        addChampionToBench(fusedChampion);

        console.log(`${championName} ha sido fusionado al Tier ${fusedChampion.tier}`);
    }
}

// Función para comprar un campeón y añadirlo al banco
function buyChampion(championName) {
    const champion = champions.find(c => c.name === championName);

    if (!champion) {
        console.error(`Campeón con nombre ${championName} no encontrado.`);
        return;
    }

    if (playerData.gold >= champion.cost) {
        spendGold(champion.cost);

        // Asignar tier 1 al campeón comprado
        const championToBench = {
            ...champion,
            tier: 1,
            id: Date.now()  // Asigna un ID único
        };

        addChampionToBench(championToBench);
        rollShop();
    } else {
        console.log("No tienes suficiente oro para comprar este campeón.");
    }
}
