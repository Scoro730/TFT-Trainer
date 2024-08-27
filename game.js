function loadGame() {
    loadChampions((champions) => {
        displayChampionsForGame(champions);
    });
}

function displayChampionsForGame(champions) {
    const championsList = document.getElementById('champions-list');
    championsList.innerHTML = '';
    champions.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}">
            <h3>${champion.name}</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}</p>
        `;
        championsList.appendChild(card);
    });
}
