function loadEdition() {
    loadChampions((champions) => {
        displayChampionsForEdit(champions);
    });
}

function displayChampionsForEdit(champions) {
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
    saveChampions();
}

function deleteChampion(index) {
    champions.splice(index, 1);
    displayChampionsForEdit(champions);
    saveChampions();
}

function addChampion() {
    champions.push({
        name: "New Champion",
        cost: 1,
        class: ["Class"],
        origin: ["Origin"]
    });
    displayChampionsForEdit(champions);
    saveChampions();
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
