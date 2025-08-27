<script>
// ==== INITIAL VALUES ====
let heartCount = 0;
let coins = 100;
let copyCount = 2; // starts from 2 as per your HTML
const heartCounter = document.getElementById('heartCount');
const coinCounter = document.getElementById('coinCount');
const copyCounter = document.getElementById('copy2');

// ==== UPDATE NAVBAR COUNTERS ====
function updateCounters() {
    heartCounter.textContent = heartCount;
    coinCounter.textContent = coins;
    copyCounter.textContent = copyCount + " Copy";
}

// ==== HEART ICON FUNCTIONALITY ====
document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', () => {
        heartCount++;
        updateCounters();
    });
});

// ==== COPY BUTTON FUNCTIONALITY ====
document.querySelectorAll('button').forEach(btn => {
    if (btn.innerHTML.includes('fa-copy')) {
        btn.addEventListener('click', () => {
            // Find nearest card and get number
            const card = btn.closest('.bg-white');
            const number = card.querySelector('p.text-3xl').textContent;
            navigator.clipboard.writeText(number).then(() => {
                copyCount++;
                updateCounters();
                alert('Number copied: ' + number);
            });
        });
    }
});

// ==== CALL BUTTON FUNCTIONALITY ====
document.querySelectorAll('button').forEach(btn => {
    if (btn.innerHTML.includes('fa-phone')) {
        btn.addEventListener('click', () => {
            const card = btn.closest('.bg-white');
            const serviceName = card.querySelector('h2').textContent;
            const number = card.querySelector('p.text-3xl').textContent;

            if (coins < 20) {
                alert('Not enough coins to make a call!');
                return;
            }

            coins -= 20;
            updateCounters();
            alert(`Calling ${serviceName}: ${number}`);

            // ==== ADD TO HISTORY ====
            let historySection = document.getElementById('historyList');
            if(!historySection){
                // create history container if not exist
                const historyDiv = document.createElement('div');
                historyDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'mt-6');
                historyDiv.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="font-bold text-lg flex items-center gap-2">
                            <i class="fa-regular fa-clock"></i> Call History
                        </h2>
                        <button id="clearHistory" class="bg-red-500 text-white px-3 py-1 rounded">Clear History</button>
                    </div>
                    <ul id="historyList" class="space-y-2"></ul>
                `;
                document.querySelector('.max-w-[1370px]').appendChild(historyDiv);
            }

            const historyList = document.getElementById('historyList');
            const li = document.createElement('li');
            const now = new Date();
            li.textContent = `${serviceName} - ${number} (${now.toLocaleTimeString()})`;
            historyList.appendChild(li);

            // Clear History Button
            const clearBtn = document.getElementById('clearHistory');
            clearBtn.addEventListener('click', () => {
                historyList.innerHTML = '';
            });
        });
    }
});

// ==== INITIAL COUNTER DISPLAY ====
updateCounters();
</script>
