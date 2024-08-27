// Cargar el archivo JSON
fetch('champions.json')
    .then(response => response.json())
    .then(data => {
        const champions = data.champions;
        const championsList = document.getElementById('champions-list');

        // Crear las tarjetas de campeones
        champions.forEach(champion => {
            const card = document.createElement('div');
            card.className = 'champion-card';
            card.innerHTML = `
                <h3>${champion.name}</h3>
                <p>Cost: ${champion.cost}</p>
                <p>Class: ${champion.class.join(', ')}</p>
                <p>Origin: ${champion.origin.join(', ')}</p>
            `;
            card.addEventListener('click', () => selectChampion(champion, card));
            championsList.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

// Función para manejar la selección de campeones
function selectChampion(champion, card) {
    const selectedChampions = document.getElementById('selected-champions');

    // Alternar selección
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        selectedChampions.removeChild(document.getElementById(champion.name));
    } else {
        card.classList.add('selected');
        const selectedCard = document.createElement('div');
        selectedCard.className = 'champion-card';
        selectedCard.id = champion.name;
        selectedCard.innerHTML = `
            <h3>${champion.name}</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}</p>
        `;
        selectedChampions.appendChild(selectedCard);
    }
}
