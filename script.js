const PASSWORD = "2524";

const reasons = [];
for(let i = 1; i <= 100; i++){
    reasons.push(`Reason ${i}`);
}

let currentLetter = 0;

let openedLetters =
JSON.parse(
localStorage.getItem("openedLetters") || "[]"
);

const app = document.getElementById("app");
const lockScreen = document.getElementById("lockScreen");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const unlockBtn = document.getElementById("unlockBtn");

const lettersContainer = document.getElementById("letters");
const progressFill = document.getElementById("progressFill");
const count = document.getElementById("count");

const modal = document.getElementById("modal");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const garden = document.getElementById("garden");
const modeBtn = document.getElementById("modeBtn");
const resetBtn = document.getElementById("resetBtn");

unlockBtn.addEventListener("click", unlockApp);

passwordInput.addEventListener("keydown", e=>{
    if(e.key === "Enter"){
        unlockApp();
    }
});

function unlockApp(){

    if(passwordInput.value.trim() === PASSWORD){

        lockScreen.style.display = "none";
        app.style.display = "block";

        buildLetters();
        updateProgress();
        updateGarden();
        createPetals();

    }else{

        passwordError.textContent =
        "Wrong password ❤️";

    }
}

function buildLetters(){

    lettersContainer.innerHTML = "";

    reasons.forEach((reason,index)=>{

        const letter =
        document.createElement("div");

        letter.className = "letter";

        if(openedLetters.includes(index)){
            letter.classList.add("opened");
        }

        const seal =
        document.createElement("div");

        seal.className = "seal";

        letter.appendChild(seal);

        letter.addEventListener(
        "click",
        ()=>{
            openLetter(index);
        });

        lettersContainer.appendChild(letter);

    });
}

function openLetter(index){

    currentLetter = index;

    if(!openedLetters.includes(index)){

        openedLetters.push(index);

        localStorage.setItem(
        "openedLetters",
        JSON.stringify(openedLetters)
        );

        updateProgress();
        updateGarden();
        buildLetters();
    }

    modal.style.display = "flex";

    letterTitle.textContent =
    `💌 Letter ${index + 1}`;

    letterText.textContent =
    reasons[index];
}

function updateProgress(){

    count.textContent =
    openedLetters.length;

    progressFill.style.width =
    openedLetters.length + "%";
}

function updateGarden(){

    garden.innerHTML = "";

    const flowers =
    ["🌸","🌷","🌹","🌻","💐"];

    openedLetters.forEach(()=>{

        const flower =
        document.createElement("div");

        flower.className = "flower";

        flower.textContent =
        flowers[
        Math.floor(
        Math.random()*flowers.length
        )];

        garden.appendChild(flower);
    });
}

closeBtn.addEventListener(
"click",
()=>{
    modal.style.display = "none";
});

prevBtn.addEventListener(
"click",
()=>{

    if(currentLetter > 0){

        currentLetter--;

        openLetter(currentLetter);
    }
});

nextBtn.addEventListener(
"click",
()=>{

    if(currentLetter < reasons.length - 1){

        currentLetter++;

        openLetter(currentLetter);
    }
});

window.addEventListener(
"click",
e=>{

    if(e.target === modal){

        modal.style.display = "none";
    }
});

modeBtn.addEventListener(
"click",
()=>{

    document.body.classList.toggle(
    "night"
    );
});

resetBtn.addEventListener(
"click",
()=>{

    if(confirm("Reset all progress?")){

        localStorage.removeItem(
        "openedLetters"
        );

        location.reload();
    }
});

function createPetals(){

    const petals =
    document.getElementById("petals");

    for(let i=0;i<30;i++){

        const petal =
        document.createElement("div");

        petal.className =
        "petal";

        petal.textContent =
        "🌸";

        petal.style.left =
        Math.random()*100 + "vw";

        petal.style.animationDuration =
        (5 + Math.random()*8) + "s";

        petals.appendChild(petal);
    }
}