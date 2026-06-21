const PASSWORD = "2524";

const reasons = [];
for (let i = 1; i <= 100; i++) {
    reasons.push(`Reason ${i} ❤️`);
}

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

document.getElementById("unlockBtn").addEventListener("click", unlockApp);

function unlockApp() {
    if (passwordInput.value.trim() === PASSWORD) {
        lockScreen.style.display = "none";
        app.style.display = "block";

        buildLetters();
        updateProgress();
        updateGarden();

        startPetals(); // 🌸 start animation ONLY after unlock
    } else {
        passwordError.textContent = "Wrong password ❤️";
    }
}

function buildLetters() {
    lettersContainer.innerHTML = "";

    reasons.forEach((_, index) => {
        const letter = document.createElement("div");
        letter.className = "letter";

        const seal = document.createElement("div");
        seal.className = "seal";

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
    }

    modal.style.display = "flex";
    letterTitle.textContent = `Letter ${index + 1}`;

    // 🌟 FINAL LETTER SPECIAL
    if (index === 99) {
        letterTitle.textContent = "💖 FINAL LETTER 💖";
        letterText.textContent =
            "You opened all 100 reasons... and I still have infinite more for you ❤️";
    } else {
        letterText.textContent = reasons[index];
    }
}

function updateProgress() {
    count.textContent = openedLetters.length;
    progressFill.style.width = (openedLetters.length / 100) * 100 + "%";
}

function updateGarden() {
    const garden = document.getElementById("garden");
    if (!garden) return;

    garden.innerHTML = "";

    openedLetters.forEach((i) => {
        const span = document.createElement("span");

        const emojis = ["🌸", "🌷", "🌺", "🌻", "🌼", "💮"];
        span.textContent = emojis[i % emojis.length];

        span.style.fontSize = "24px";
        span.style.margin = "5px";

        garden.appendChild(span);
    });
}

// Modal controls
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

/* 🌸 PETALS SYSTEM (FIXED + CLEAN) */
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