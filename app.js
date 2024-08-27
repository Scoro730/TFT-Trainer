let champions = [];

function loadChampions() {
    fetch('champions.json')
        .then(response => response.json())
        .then(data => {
            champions = data.champions;
            if (document.title.includes("Edition")) {
                displayChampionsForEdit();
            } else if (document.title.includes("Game")) {
                displayChampionsForGame();
            }
        })
        .catch(error => {
            console.error('Error loading champions:', error);
        });
}

function displayChampionsForGame() {
    const championsList = document.getElementById('champions-list');
    championsList.innerHTML = '';
    champions.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.innerHTML = `
            <h3>${champion.name}</h3>
            <p>Cost: ${champion.cost}</p>
            <p>Class: ${champion.class.join(', ')}</p>
            <p>Origin: ${champion.origin.join(', ')}</p>
        `;
        championsList.appendChild(card);
    });
}

function displayChampionsForEdit() {
    const editor = document.getElementById('champions-editor');
    editor.innerHTML = '';
    champions.forEach((champion, index) => {
        const row = document.createElement('div');
        row.className = 'champion-edit-row';
        row.innerHTML = `
            <input type="text" value="${champion.name}" onchange="editChampion(${index}, 'name', this.value)">
            <input type="number" value="${champion.cost}" onchange="editChampion(${index}, 'cost', this.value)">
            <input type="text" value="${champion.class.join(', ')}" onchange="editChampion(${index}, 'class', this.value.split(', '))">
            <input type="text" value="${champion.origin.join(', ')}" onchange="editChampion(${index}, 'origin', this.value.split(', '))">
            <button onclick="deleteChampion(${index})">Delete</button>
        `;
        editor.appendChild(row);
    });
}

function editChampion(index, field, value) {
    champions[index][field] = value;
}

function deleteChampion(index) {
    champions.splice(index, 1);
    displayChampionsForEdit();
}

function addChampion() {
    champions.push({
        name: "New Champion",
        cost: 1,
        class: ["Class"],
        origin: ["Origin"]
    });
    displayChampionsForEdit();
}

function saveChampions() {
    const jsonContent = JSON.stringify({ champions: champions }, null, 2);
    downloadFile('champions.json', jsonContent);
}

function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

loadChampions();
