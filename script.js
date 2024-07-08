async function fetchAllCharacters() {
    try {
        let url = 'https://swapi.dev/api/people/';
        let characterList = document.getElementById('character-list');

        while (url) {
            const response = await fetch(url);
            const data = await response.json();

            for (const character of data.results) {
                const characterName = character.name;
                const films = character.films.length;

                const characterId = character.url.match(/\/([0-9]*)\/$/)[1];
                const characterImageURL = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

                const characterItem = document.createElement('li');

                const characterImage = document.createElement('img');
                characterImage.src = characterImageURL;
                characterImage.alt = characterName;

                const characterInfo = document.createElement('p');
                characterInfo.textContent = `Personagem: ${characterName} Número de filmes: ${films}`;

                characterItem.appendChild(characterImage);
                characterItem.appendChild(characterInfo);
                characterList.appendChild(characterItem);
            }

            url = data.next;
        }
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
    }
}

window.onload = fetchAllCharacters;
