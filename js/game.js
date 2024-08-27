function startGame() {
    // Ocultar la sección de inicio y mostrar la sección de juego
    document.getElementById('home').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Inicializar la tienda, banco y campo
    initShop();
    initBench();
    initField();
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
