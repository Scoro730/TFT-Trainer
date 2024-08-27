function startGame() {
    // Ocultar la sección de inicio
    document.getElementById('home').style.display = 'none';

    // Mostrar la sección de juego
    document.getElementById('game').style.display = 'block';

    // Iniciar la lógica de la tienda
    rollShop();
}

function showSection(section) {
    // Lógica futura para cambiar entre secciones
    console.log('Sección ' + section + ' seleccionada');
}
