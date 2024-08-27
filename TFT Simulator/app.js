// Datos de los campeones
const champions = [
    {
      name: "Lillia",
      cost: 1,
      class: ["Faerie"],
      origin: ["Mage"]
    },
    {
      name: "Swain",
      cost: 3,
      class: ["Frost"],
      origin: ["Dragon"]
    },
    {
      name: "Veigar",
      cost: 3,
      class: ["Honeymancy"],
      origin: ["Mage"]
    }
    // Puedes agregar más campeones según sea necesario
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
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
  });
  
  function selectChampion(champion, card) {
      const selectedChampions = document.getElementById('selected-champions');
  
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
  