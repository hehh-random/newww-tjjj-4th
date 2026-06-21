const PASSWORD = "2524";

const reasons = Array.from({ length: 100 }, (_, i) => `Reason ${i + 1} ❤️`);

let currentLetter = 0;
let openedLetters = JSON.parse(localStorage.getItem("openedLetters") || "[]");

const app = document.getElementById("app");
const lockScreen = document.getElementById("lockScreen");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const lettersContainer = document.getElementById("letters");
const modal = document.getElementById("modal");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");

const progressFill = document.getElementById("progressFill");
const count = document.getElementById("count");

document.getElementById("unlockBtn").onclick = unlockApp;

function unlockApp() {
    if (passwordInput.value.trim() === PASSWORD) {
        lockScreen.style.display = "none";
        app.style.display = "block";

        buildLetters();
        updateProgress();
        updateGarden();
        startPetals();
    } else {
        passwordError.textContent = "Wrong password ❤️";
    }
}

function buildLetters() {
    lettersContainer.innerHTML = "";

    reasons.forEach((_, index) => {
        const letter = document.createElement("div");
        letter.className = "letter";

        // 💌 seal
        const seal = document.createElement("div");
        seal.className = "seal";

        // 💔 mark opened letters visually
        if (openedLetters.includes(index)) {
            letter.classList.add("opened");
        }

        letter.appendChild(seal);

        letter.onclick = () => openLetter(index);

        lettersContainer.appendChild(letter);
    });
}

function openLetter(index) {
    currentLetter = index;

    if (!openedLetters.includes(index)) {
        openedLetters.push(index);
        localStorage.setItem("openedLetters", JSON.stringify(openedLetters));

        updateProgress();
        updateGarden();
        rebuildLetters();
    }

    modal.style.display = "flex";
    letterTitle.textContent = `Letter ${index + 1}`;

    if (index === 99) {
        letterTitle.textContent = "💖 FINAL LETTER 💖";
        typeWriter(
            "You opened all 100 reasons... and I still have infinite more for you ❤️",
            letterText,
            20
        );
    } else {
        typeWriter(reasons[index], letterText, 20);
    }
}

/* 💌 refresh letters so they visually “open” */
function rebuildLetters() {
    buildLetters();
}

/* 🌸 FIXED MEMORY GARDEN (NO DUPLICATES, CLEAN ORDER) */
function updateGarden() {
    const garden = document.getElementById("garden");
    if (!garden) return;

    garden.innerHTML = "";

    openedLetters.forEach((i) => {
        const span = document.createElement("span");

        const emojis = ["🌸", "🌷", "🌺", "🌻", "🌼", "💮"];
        span.textContent = emojis[i % emojis.length];

        span.className = "flower";

        garden.appendChild(span);
    });
}

/* 📊 progress */
function updateProgress() {
    count.textContent = openedLetters.length;
    progressFill.style.width = `${(openedLetters.length / 100) * 100}%`;
}

/* 💌 modal controls */
document.getElementById("closeBtn").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("nextBtn").onclick = () => {
    if (currentLetter < 99) openLetter(currentLetter + 1);
};

document.getElementById("prevBtn").onclick = () => {
    if (currentLetter > 0) openLetter(currentLetter - 1);
};

document.getElementById("modeBtn").onclick = () => {
    document.body.classList.toggle("night");
};

document.getElementById("resetBtn").onclick = () => {
    localStorage.removeItem("openedLetters");
    location.reload();
};

/* 🌸 PETALS */
function spawnPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";

    const emojis = ["🌸", "🌺", "💮", "🌷", "✨"];
    petal.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = 3 + Math.random() * 4 + "s";
    petal.style.fontSize = 12 + Math.random() * 18 + "px";

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 8000);
}

function startPetals() {
    setInterval(spawnPetal, 250);
}