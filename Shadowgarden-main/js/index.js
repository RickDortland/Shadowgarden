// Hier worden al de const gemaakt van de items/documents die er gemaakt worden//
const pizza = document.querySelector("#pizza");
const autoClick = document.querySelector("#auto-click");
const autoClickTextPrice = document.querySelector("#auto-click .price span");
const upgradeClick = document.querySelector("#upgrade-click");
const upgradeClickTextPrice = document.querySelector("#upgrade-click .price span");

// Hier word de const gemaakt van de thema van het navbar//
const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

// Hier word de const en de werking aangemaakt van de navbar thema//
const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

// Hier krijg je de werking van het thema zodat het kan veranderen elke keer als je op klikt//
function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

// Hier word uitgelegt dat er op click de thema verandert//
document.getElementById('themeButton').onclick = toggleTheme;



// Hier word de const aangemaakt van de pizza en de scores die werkend worden door dit//
const updateScore = pizzas => {
    const title = document.querySelector("title");
    const score = document.querySelector("#score span");

    score.innerText = pizzas;
    title.innerHTML = pizzas + " pizzas - Pizza Clicker" 

    localStorage.setItem("pizzas", pizzas);
}

// Hier word de const aangemaakt van het powerup waardoor er powerups werken in het game//
const updatePowerupsStorage = powerup =>  {
    // JSON is objectconstanten, arrays en scalaire gegevens weer te geven//
    let powerups = JSON.parse(localStorage.getItem("powerups")) || [];
    powerups.push(powerup);

    localStorage.setItem("powerups", JSON.stringify(powerups));
}

// Hier word de const aangemaakt van het powerup waardoor er powerups werken in het game//
const getStorage = () => {
    const pizzas = localStorage.getItem("pizzas") || 0;
    const powerups = JSON.parse(localStorage.getItem("powerups")) || [];

    const storage = {
        "pizzas": pizzas,
        "powerups": powerups
    }

    return storage;
}

//Hier word aangemaakt dat als je op het pizza clickt dat de score omhoog gaat//
const pizzaClicked = pizzas => {
    const storage = getStorage();

    const score = document.querySelector("#score span");
    const scoreValue = pizzas ? pizzas : parseInt(score.innerText);

    let newScore;
// Hier is uitgebreid gemaakt dat er door powerups meer clicks krijg enz.//
    if(storage.powerups.includes("upgrade-click")) {
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length;
        if(multiplier == 1) {
            newScore = scoreValue + 2;
        } else {
            newScore = scoreValue + (2 * multiplier)
        }
    } else {
        newScore = scoreValue + 1;
    }

    updateScore(newScore);
}

// Hier worden de particles aangemaakt van het pizza//s
const createParticle = (x,y) => {
    const pizzaClicks = document.querySelector(".pizza-clicks");
// De particles gaan naar boven en verdwijnen na een tijdtje als het beneden te zien is//
    const particle = document.createElement("img");
    particle.setAttribute("src", "../images/pizzari.png");
    particle.setAttribute("class", "pizza-particle");
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    pizzaClicks.appendChild(particle);


    setTimeout(() => {
        pizzaClicks.removeChild(particle);
    }, 3000);
}


pizza.addEventListener("click", (e) => {
    createParticle(e.clientX, e.clientY);
    pizzaClicked()
});

// Hier word de auto click werkend gemaakt (je krijgt +1 elke keer als je op het pizza klikt)//
const autoClickPizza = () => {
    setInterval(() => {
        const score = document.querySelector("#score span");
        const scoreValue = parseInt(score.innerText);

        newScore = scoreValue + 1;

        updateScore(newScore); 
    }, 1000)
}

// Hier word er gemaakt dat de prijs van het autoclick steeds hoger word nadat je het al 1 keer hebt gekocht//
autoClick.addEventListener("click", () => {
    const price = autoClick.getAttribute("data-price");
    const score = document.querySelector("#score span");
    const scoreValue = parseInt(score.innerText)

    if (scoreValue >= price) {
        updatePowerupsStorage("auto-click");

        const storage = getStorage();
        const quantAutoClicks = storage.powerups.filter(powerup => powerup == "auto-click").length;

        const newScore = scoreValue - price;    

        updateScore(newScore)
// Hier word er gemaakt dat de prijs van het autoclick steeds hoger word nadat je het al 1 keer hebt gekocht//
        if(quantAutoClicks == 1) {
            autoClick.setAttribute("data-price", 100 * 2);
            autoClickTextPrice.innerHTML = 100 * 2;
        } else {
            autoClick.setAttribute("data-price", 100 * (quantAutoClicks + 1));
            autoClickTextPrice.innerHTML = 100 * (quantAutoClicks + 1);
        }

        document.querySelector(".auto-clicks").classList.remove("disable");

        document.querySelector(".auto-clicks .cursors").innerHTML += '<img src="../images/pizza-chef.png" alt="chef" id="chef" class="chef auto">'

        autoClickPizza();
    } else {
        autoClick.classList.add("invalid")
        setTimeout(() => {
            autoClick.classList.remove("invalid")
        }, 300);
    }
})

// Hier word er gemaakt dat als je geen geld hebt om de powerups te kopen dat het je blockeerd om het aan te klikken//
upgradeClick.addEventListener("click", () => {
    const price = upgradeClick.getAttribute("data-price");
    const score = document.querySelector("#score span");
    const scoreValue = parseInt(score.innerText)

    if (scoreValue >= price) {
        updatePowerupsStorage("upgrade-click");

        const storage = getStorage();
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length;

        const newScore = scoreValue - price;    

        updateScore(newScore)
// Hier is de multiplier van het powerup gemaakt zodat het elke keer meer kost als je het koopt//
        if(multiplier == 1) {
            upgradeClick.setAttribute("data-price", 100 * 2);
            upgradeClickTextPrice.innerHTML = 100 * 2;
        } else {
            upgradeClick.setAttribute("data-price", 100 * (2 ** multiplier));
            upgradeClickTextPrice.innerHTML = 100 * (2 ** multiplier);
        }
    } else {
        upgradeClick.classList.add("invalid")
        setTimeout(() => {
            upgradeClick.classList.remove("invalid")
        }, 300);
    }
})

// Hier word er gemaakt dat de game jouw data opslaat en nadat je de tab opnieuw opent dat de data steeds hetzelfde is//
const getSavedData = () => {
    const storage = getStorage();

    updateScore(storage.pizzas);

    if(storage.powerups.includes("upgrade-click")) {
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length;

        if(multiplier == 1) {
            upgradeClick.setAttribute("data-price", 100 * 2);
            upgradeClickTextPrice.innerHTML = 100 * 2;
        } else {
            upgradeClick.setAttribute("data-price", 100 * (2 ** multiplier));
            upgradeClickTextPrice.innerHTML = 100 * (2 ** multiplier);
        }
    }
    if(storage.powerups.includes("auto-click")) {
        const quantAutoClicks = storage.powerups.filter(powerup => powerup == "auto-click").length;

        document.querySelector("auto-clicks").classList.remove("disable")

        if(quantAutoClicks == 1) {
            autoClick.setAttribute("data-price", 100 * 2);
            autoClickTextPrice.innerHTML = 100 * 2;
        } else {
            autoClick.setAttribute("data-price", 100 * (quantAutoClicks + 1));
            autoClickTextPrice.innerHTML = 100 * (quantAutoClicks + 1);
        }

        for (i=1;i <= quantAutoClicks; i++) {
            autoClick();

            document.querySelector(".auto-clicks").classList.remove("disable");
            document.querySelector(".auto-clicks .cursors").innerHTML += '<img src="../images/pizza-chef.png" alt="chef" id="chef" class="chef auto">'
        }
    }
}
// Hier word er gemaakt dat de game jouw data opslaat en nadat je de tab opnieuw opent dat de data steeds hetzelfde is//
document.addEventListener("load", getSavedData());
