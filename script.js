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

function unlockApp(){
    if(passwordInput.value.trim() === PASSWORD){
        lockScreen.style.display = "none";
        app.style.display = "block";
        buildLetters();
        updateProgress();
    } else {
        passwordError.textContent = "Wrong password ❤️";
    }
}

function buildLetters(){
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

function openLetter(index){
    currentLetter = index;

    if(!openedLetters.includes(index)){
        openedLetters.push(index);
        localStorage.setItem("openedLetters", JSON.stringify(openedLetters));
        updateProgress();
    }

    modal.style.display = "flex";
    letterTitle.textContent = `Letter ${index + 1}`;
    letterText.textContent = reasons[index];
}

function updateProgress(){
    count.textContent = openedLetters.length;
    progressFill.style.width = (openedLetters.length / 100) * 100 + "%";
}

document.getElementById("closeBtn").onclick = () => modal.style.display = "none";

document.getElementById("nextBtn").onclick = () => {
    if(currentLetter < 99) openLetter(currentLetter + 1);
};

document.getElementById("prevBtn").onclick = () => {
    if(currentLetter > 0) openLetter(currentLetter - 1);
};

document.getElementById("modeBtn").onclick = () => {
    document.body.classList.toggle("night");
};

document.getElementById("resetBtn").onclick = () => {
    localStorage.removeItem("openedLetters");
    location.reload();
};