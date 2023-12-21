//   Votre mission est de coder un générateur de dégradés.
//   Vous allez manipuler des inputs de couleurs afin de créer des "linear-gradient" à la volée !

// A. Coder une interface basique
// Codez d'abord une interface très simple, contenant les éléments importants : boutons, inputs, liens, etc...
// Rajoutez un peu de style si besoin est. 

// Puis codez les fonctionnalités JavaScript.

// B. Fonctionnalités JavaScript à coder pour ce projet

// 1. Gérez l'implémentation de base des couleurs, il faut qu'il y est un dégradé lorsqu'on arrive sur le site (input, orientation, body...).
// 2. Gérez le changement de couleur, on doit pouvoir manipuler les inputs et provoquer le changement de couleur du site.
// 3. Occupez-vous de l'inclinaison avec l'input type "range".
// 4. Mettez en place la copie du dégradé en cliquant su le bouton "Copier le gradient".
// 5. Faites-en sorte de créer des dégradés au hasard en cliquant sur le bouton "random".
// 6. Bonne chance ! 

// C. Ajoutez du style à l'interface afin de terminer le projet.

// Variables
let color1 = document.querySelector('#color1');
let color2 = document.querySelector('#color2');
let deg = 90;
let orientationText = document.querySelector('.orientation');
let inputRange = document.querySelector('#orientation');
let inputcolor1 = document.querySelector('.colorpicker1');
let inputcolor2 = document.querySelector('.colorpicker2');
let boutonCopier = document.querySelector('.copy');
let copierPopup = document.querySelector('.copyPopup');
let boutonRandom = document.querySelector('.random');

color1.style.backgroundColor = color1.textContent;
color2.style.backgroundColor = color2.textContent;
orientationText.textContent = `Orientation : ${deg}°`
document.body.style.background = `linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent})`;


// fonction pour l'input range de l'orientation
inputRange.addEventListener("input", function () {
    deg = inputRange.value;
    document.body.style.background = `linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent})`;
    orientationText.textContent = `Orientation : ${deg}°`
});

// Fonction pour appliquer deux couleurs random
boutonRandom.addEventListener('click', function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    color1.textContent = color;
    color1.style.backgroundColor = color;
    color1.style.color = contrast(color);
    color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    color2.textContent = color;
    color2.style.backgroundColor = color;
    color2.style.color = contrast(inputcolor2.value);
    document.body.style.background = `linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent})`;


});

// keyframes de l'animation du bouton copier
const popup = [{ opacity: "1", bottom: '-60px' },
{ opacity: "1" }, { opacity: "0", bottom: '-50px' },];

// options de l'animation du bouton copier
const popupTiming = {
    duration: 1000,
    iterations: 1,
};

// fonction du bouton copier : enregistrer le code dans le presse papier + lancer l'animation du carde flottant "Copié !"
boutonCopier.addEventListener('click', function () {
    let gradientString = `background : linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent});`
    navigator.clipboard.writeText(gradientString);
    copierPopup.animate(popup, popupTiming);
});

// fonction pour appliqué l'input color1
inputcolor1.addEventListener('input', function () {
    color1.textContent = inputcolor1.value;
    document.body.style.background = `linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent})`;
    color1.style.backgroundColor = inputcolor1.value;
    color1.style.color = contrast(inputcolor1.value);
});

// fonction pour appliqué l'input color2
inputcolor2.addEventListener('input', function () {
    color2.textContent = inputcolor2.value;
    document.body.style.background = `linear-gradient(${deg}deg, ${color1.textContent}, ${color2.textContent})`;
    color2.style.backgroundColor = inputcolor2.value;
    color2.style.color = contrast(inputcolor2.value);
});

// Change la couleur du texte en fonction de la couleur du background
function contrast(hex) {
    var threshold = 149;
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    // 6 digits
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    return ((r*0.299 + g*0.587 + b*0.114) > threshold) ? '#000000' : '#ffffff';
  }