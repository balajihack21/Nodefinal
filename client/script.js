async function submitForm() {
    const form = document.getElementById('playerForm');
    const btn=document.querySelector('form button')
    const key=btn.getAttribute('key')
    const formData = new FormData(form);
    const playerData = {};

    formData.forEach((value, key) => {
        playerData[key] = value;
    });
if (key){
    const data=await axios.put(`http://localhost:4000/api/updatePlayer/${key}`,playerData)
    console.log(playerData)
}
else{
    const res=await axios.post('http://localhost:4000/api/addPlayer',playerData)
    await displaySearchResults(res.data)
}

    
}

function searchPlayer() {
    const searchName = document.getElementById('searchName').value;
    fetch(`http://localhost:4000/api/searchPlayer?name=${searchName}`)
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error searching player:', error);
    });
}

function displaySearchResults(data) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    data.forEach(player => {
        const playerInfo = document.createElement('div');
        playerInfo.innerHTML = `
            <h3>${player.name}</h3>
            <p>Date of Birth: ${player.dob}</p>
            <p>Birthplace: ${player.birthplace}</p>
            <p>Career Stats: Matches - ${player.matches}, Score - ${player.score}, Fifties - ${player.fifties}, Centuries - ${player.centuries}, Wickets - ${player.wickets}, Average - ${player.average}</p>
            <button onclick="editPlayer(${player.id})">Edit Profile</button>
        `;
        resultsContainer.appendChild(playerInfo);
    });
}

async function editPlayer(playerId) {
    const btn=document.querySelector('form button')
    btn.setAttribute('key',playerId)
    const res=await axios.get(`http://localhost:4000/api/getPlayer/${playerId}`)
    const data=res.data
        document.getElementById('name').value = data[0].name;
        document.getElementById('dob').value = data[0].dob;
        document.getElementById('photoUrl').value = data[0].photoUrl;
        document.getElementById('birthplace').value = data[0].birthplace;
        document.getElementById('matches').value = data[0].matches;
        document.getElementById('score').value = data[0].score;
        document.getElementById('fifties').value = data[0].fifties;
        document.getElementById('centuries').value = data[0].centuries;
        document.getElementById('wickets').value = data[0].wickets;
        document.getElementById('average').value = data[0].average;
    
}
