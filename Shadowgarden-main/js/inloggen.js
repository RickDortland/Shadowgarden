function submitForm() {
    // Hier kun je extra validatie toevoegen voordat je naar een andere pagina gaat

    // Verkrijg de waarden van de ingevoerde gegevens (indien nodig)
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Voer de gewenste validatie uit...

    // Ga naar het andere HTML-document (bijvoorbeeld 'dashboard.html')
    window.location.href = 'index.html';
}