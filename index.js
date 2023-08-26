const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    searchSuperhero(searchTerm);
  }
});

async function searchSuperhero(name) {
  try {
    const response = await fetch(`https://superheroapi.com/api/YOUR_API_KEY/search/${name}`);
    const data = await response.json();

    displayResults(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayResults(results) {
  resultContainer.innerHTML = '';

  if (results.length === 0) {
    resultContainer.innerHTML = 'No superheroes found.';
    return;
  }

  results.forEach(superhero => {
    const superheroCard = document.createElement('div');
    superheroCard.classList.add('superhero-card');

    superheroCard.innerHTML = `
      <h2>${superhero.name}</h2>
      <img src="${superhero.image.url}" alt="${superhero.name}">
      <p>Powerstats:</p>
      <ul>
        <li>Intelligence: ${superhero.powerstats.intelligence}</li>
        <li>Strength: ${superhero.powerstats.strength}</li>
        <li>Speed: ${superhero.powerstats.speed}</li>
      </ul>
    `;

    resultContainer.appendChild(superheroCard);
  });
}
