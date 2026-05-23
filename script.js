// ==========================================
// 1. TIMER SEKCE (Odpočet k dalšímu zápasu)
// ==========================================
const matchData = {
    opponent: "Liberec handball",
    date: "2026-06-14T18:00:00" 
};

function updateCountdown() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return; 

    const now = new Date().getTime();
    const matchDate = new Date(matchData.date).getTime();
    const diff = matchDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const slots = timerElement.querySelectorAll('span');
        if (slots.length === 4) {
            slots[0].textContent = days.toString().padStart(2, '0');
            slots[1].textContent = hours.toString().padStart(2, '0');
            slots[2].textContent = minutes.toString().padStart(2, '0');
            slots[3].textContent = seconds.toString().padStart(2, '0');
        }
    } else {
        timerElement.innerHTML = "<div style='width:100%; text-align:center; font-family:Oswald; font-size:20px;'>ZÁPAS PRÁVĚ PROBÍHÁ!</div>";
    }
}

// ==========================================
// 2. DATA HRÁČŮ A CESTY K FOTKÁM
// ==========================================
const allTeams = {
    muzi: [
        { number: 1, name: "PETR MODRÝ", position: "Brankář", image: "img/hrac.png" },
        { number: 14, name: "JAN PETŘÍK", position: "Levá spojka", image: "img/hrac.png" },
        { number: 10, name: "LUKÁŠ ČERNÝ", position: "Pravá spojka", image: "img/hrac.png" },
        { number: 8, name: "MAREK SOUKUP", position: "Pivot", image: "img/hrac.png" },
        { number: 5, name: "JIŘÍ BÍLÝ", position: "Levé křídlo", image: "img/hrac.png" },
        { number: 21, name: "TOMÁŠ KRAJČÍ", position: "Pravé křídlo", image: "img/hrac.png" }
    ],
    dorost: [
        { number: 1, name: "MARTIN HLAVA", position: "Brankář", image: "img/hrac.png" },
        { number: 2, name: "DOMINIK ŽÁK", position: "Levá spojka", image: "img/hrac.png" },
        { number: 3, name: "MIROSLAV MUSIL", position: "Pravá spojka", image: "img/hrac.png" },
        { number: 4, name: "JAKUB VRÁNA", position: "Pivot", image: "img/hrac.png" },
        { number: 5, name: "JAN GRAPO", position: "Levé křídlo", image: "img/hrac.png" },
        { number: 6, name: "RADIM NOVÁK", position: "Pravé křídlo", image: "img/hrac.png" }
    ]
};

// ==========================================
// 3. NAČÍTÁNÍ A FILTROVÁNÍ SOUPISKY
//    (Generuje strukturu pro CSS animace)
// ==========================================
function loadPlayers(teamKey = 'muzi') {
    const playerGrid = document.getElementById('playerList');
    if (!playerGrid) return; 

    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase();
        if ((teamKey === 'muzi' && btnText.includes('muži')) || 
            (teamKey === 'dorost' && btnText.includes('dorost'))) {
            btn.classList.add('active');
        }
    });

    const players = allTeams[teamKey];
    playerGrid.innerHTML = '';

    players.forEach(player => {
        // Třídy player-card, player-number-badge a player-img-container 
        // jsou provázané s CSS transitions pro plynulé hover efekty.
        playerGrid.innerHTML += `
            <div class="player-card">
                <div class="player-number-badge">${player.number}</div>
                <div class="player-img-container">
                    <img src="${player.image}" alt="${player.name}" onerror="this.parentElement.classList.add('no-img'); this.style.display='none';">
                </div>
                <div class="player-info">
                    <h4>${player.name}</h4>
                    <p>${player.position}</p>
                </div>
            </div>`;
    });
}

// ==========================================
// 4. SPUŠTĚNÍ FUNKCÍ PO NAČTENÍ STRÁNKY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayers('muzi'); 
    updateCountdown();  
    setInterval(updateCountdown, 1000); 

    // Správná obsluha kliknutí na filtry týmů
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isMuzi = button.textContent.toLowerCase().includes('muži');
            loadPlayers(isMuzi ? 'muzi' : 'dorost');
        });
    });
});

// ==========================================
// 5. OBSLUHA NÁBOROVÉHO FORMULÁŘE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const formular = document.getElementById('naborovy-formular');
    
    if (formular) {
        formular.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const formBox = formular.parentElement;
            
            if (formBox) {
                formBox.innerHTML = `
                    <div style="text-align: center; padding: 40px 0; font-family: 'Inter';">
                        <span style="font-size: 50px;">✅</span>
                        <h2 style="font-family: 'Oswald'; text-transform: uppercase; color: #FFD700; margin-top: 20px; font-size: 30px;">DĚKUJEME ZA PŘIHLÁŠKU!</h2>
                        <p style="color: #ccc; margin-top: 10px; line-height: 1.6; font-size: 16px;">
                            Údaje byly úspěšně zaznamenány. Náš šéftrenér mládeže se vám v nejbližších dnech ozve telefonicky nebo e-mailem.
                        </p>
                        <a href="index.html" class="link-all" style="margin-top: 30px;">ZPĚT NA ÚVOD</a>
                    </div>
                `;
            }
        });
    }
});