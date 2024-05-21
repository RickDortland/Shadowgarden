function showText(element) {
    var textElement = element.querySelector('.image-text');

    // Controleer welke afbeelding is geklikt op basis van de alt-attribuutwaarde
    var imageName = element.querySelector('img').getAttribute('alt');

    // Definieer teksten op basis van de alt-attribuutwaarde
    var textMap = {
        'Image 1': 'Galaxy',
        'Image 2': 'pizzadoos',
        'Image 3': 'pizzafabriek',
        'Image 4': 'pizzafarm',
        'Image 5': 'Pizza Delivery Vehicle',
        'Image 6': 'premium pizza trailer',
        // Voeg teksten toe voor andere afbeeldingen
    };

    // Controleer of de huidige afbeelding een bijbehorende tekst heeft
    if (textMap.hasOwnProperty(imageName)) {
        textElement.textContent = textMap[imageName];
    } else {
        textElement.textContent = 'Standaardtekst als er geen overeenkomende tekst is gevonden.';
    }

    // Hier kun je de tekst op een andere manier weergeven, bijvoorbeeld in een modaal venster
    alert(textElement.textContent);
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}   
