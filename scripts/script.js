// ===== INITIAL VALUES =====
let heartCount = 0;
let coins = 100;
let copyCount = 2; // From your HTML
const heartCounter = document.getElementById('heartCount');
const coinCounter = document.getElementById('coinCount');
const copyCounter = document.getElementById('copy2');

// ===== UPDATE NAVBAR COUNTERS =====
function updateCounters() {
    heartCounter.textContent = heartCount;
    coinCounter.textContent = coins;
    copyCounter.textContent = copyCount + " Copy";
}

// ===== HEART ICON FUNCTIONALITY =====
document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', () => {
        heartCount++;
        updateCounters();
    });
});

// ===== CREATE HISTORY SECTION (Right side top) =====
let historyList = null;
function createHistorySection() {
    if (!historyList) {
        const rightCol = document.querySelector('.col-span-1');
        const historyDiv = document.createElement('div');
        historyDiv.classList.add('bg-white', 'rounded-2xl', 'shadow-md', 'p-5', 'mb-4');
        historyDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h2 class="font-bold text-lg flex items-center gap-2">
                    <i class="fa-regular fa-clock"></i> Call History
                </h2>
                <button id="clearHistory" class="bg-green-700 text-white px-3 py-1 rounded">Clear History</button>
            </div>
            <ul id="historyList" class="space-y-2 max-h-60 overflow-y-auto"></ul>
        `;
        rightCol.prepend(historyDiv);
        historyList = document.getElementById('historyList');

        // Clear History button
        document.getElementById('clearHistory').addEventListener('click', () => {
            historyList.innerHTML = '';
        });
    }
}

// ===== COPY BUTTON FUNCTIONALITY =====
document.querySelectorAll('button').forEach(btn => {
    if (btn.innerHTML.includes('fa-copy')) {
        btn.addEventListener('click', () => {
            const card = btn.closest('.bg-white');
            const number = card.querySelector('p.text-3xl').textContent;
            navigator.clipboard.writeText(number).then(() => {
                copyCount++;
                updateCounters();
                createHistorySection();
                const li = document.createElement('li');
                const now = new Date();
                li.textContent = `Copied: ${number} (${now.toLocaleTimeString()})`;
                historyList.prepend(li);
            });
        });
    }
});

// ===== CALL BUTTON FUNCTIONALITY =====
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

            // Custom alert (without blocking the page)
            const alertBox = document.createElement('div');
            alertBox.classList.add('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 
                                    'bg-white', 'border', 'border-gray-300', 'rounded-lg', 'shadow-lg', 'p-5', 'z-50');
            alertBox.innerHTML = `
                <p class="text-lg font-bold mb-2">Calling ${serviceName}</p>
                <p class="text-gray-700 mb-3">${number}</p>
                <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">OK</button>
            `;
            document.body.appendChild(alertBox);

            const okBtn = alertBox.querySelector('button');
            okBtn.addEventListener('click', () => {
                document.body.removeChild(alertBox);
            });

            // Add call to history
            createHistorySection();
            const li = document.createElement('li');
            const now = new Date();
            li.textContent = `Called: ${serviceName} - ${number} (${now.toLocaleTimeString()})`;
            historyList.prepend(li);
        });
    }
});

// ===== INITIAL COUNTER DISPLAY =====
updateCounters();
