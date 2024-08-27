document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page');

    switch (page) {
        case 'home':
            // No se necesita carga especial en el home
            break;
        case 'game':
            loadGame();
            break;
        case 'edition':
            loadEdition();
            break;
        default:
            console.error('Página desconocida');
    }
});

// Función para cargar los campeones desde el JSON (común para todos los archivos)
function loadChampions(callback) {
    fetch('champions.json')
        .then(response => response.json())
        .then(data => {
            callback(data.champions);
        })
        .catch(error => {
            console.error('Error al cargar los campeones:', error);
        });
}
