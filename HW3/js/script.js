const APISite = 'https://rickandmortyapi.com/api/character';

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting and refreshing page
    searchCharacter();
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCharacter();
});

async function searchCharacter() {
    const input = document.getElementById('searchInput').value.trim();          
    if (!input) {
        showError('Please enter a character ID or name');
        return;
    }
    hideAll();
    try {
        let character;
                
        if (/^\d+$/.test(input)) { //https://www.geeksforgeeks.org/javascript/how-to-check-if-string-contains-only-digits-in-javascript/
            // Search by ID
            const id = parseInt(input);
            if (id < 1 || id > 826) {
                showError('ID must be between 1 and 826');
                return;
            }
            character = await fetchById(id);
        } else {character = await fetchByName(input);}
        displayCharacter(character);
    } catch (error) {showError(error.message);}
}

async function fetchById(id) {
    const response = await fetch(`${APISite}/${id}`);
    if (!response.ok) {
        throw new Error('Character not found');
    }
    return await response.json();
}

async function fetchByName(name) {
    const response = await fetch(`${APISite}/?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
        throw new Error('Character not found');
    }
    const data = await response.json();
            
    if (data.results.length === 0) {
        throw new Error('No characters found with that name');
    }
    return data.results[0];
}

function displayCharacter(char) {
    document.getElementById('charImage').src = char.image;
    document.getElementById('charName').textContent = char.name;
            
    const statusEl = document.getElementById('charStatus');
    statusEl.textContent = char.status;
    statusEl.className = 'status ' + char.status.toLowerCase();
            
    document.getElementById('charSpecies').textContent = char.species;
    document.getElementById('charType').textContent = char.type || 'N/A';
    document.getElementById('charGender').textContent = char.gender;
    document.getElementById('charOrigin').textContent = char.origin.name;
    document.getElementById('charLocation').textContent = char.location.name;
    document.getElementById('charEpisodes').textContent = char.episode.length + ' episodes';
    document.getElementById('characterCard').style.display = 'block';
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

function hideAll() {
    document.getElementById('error').style.display = 'none';
    document.getElementById('characterCard').style.display = 'none';
}