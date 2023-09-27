document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('naechsteFrageButton').addEventListener('click', naechsteFrage);

let fragen = [
    {
        frage: 'Welche Farbe hat der Himmel?',
        antworten: ['Blau', 'Grün', 'Rot', 'Gelb'],
        richtig: 'Blau'
      },
      {
        frage: 'Wie schreibt man den Postboten ohne das O?',
        antworten: [ 'Postler','Zusteller','Briefträger','Pöstler'],
        richtig : 'Briefträger'
     },
     {
        frage: 'Welche Frucht hat keinen Mut?',
        antworten: ['Melone','Birne', 'Feige','Apfel'],
        richtig : 'Feige'
     }

];
let aktuelleFrageIndex = 0;
let punktzahl = 0;

function startQuiz() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('frageContainer').style.display = 'block';
    fragen = getFragenFromServer(); // Funktion zum Abrufen der Fragen vom Server
    zeigeFrage();
}

function zeigeFrage() {
    const frageElement = document.getElementById('frage');
    const antwortenElement = document.getElementById('antworten');
    frageElement.innerText = fragen[aktuelleFrageIndex].frage;

    while (antwortenElement.firstChild) {
        antwortenElement.removeChild(antwortenElement.firstChild);
    }

    fragen[aktuelleFrageIndex].antworten.forEach((antwort) => {
        const button = document.createElement('button');
        button.innerText = antwort;
        button.addEventListener('click', () => pruefeAntwort(antwort));
        antwortenElement.appendChild(button);
    });
}

function pruefeAntwort(antwort) {
    const ergebnisElement = document.getElementById('ergebnis');
    const ergebnisContainer = document.getElementById('ergebnisContainer');

    if (antwort === fragen[aktuelleFrageIndex].richtig) {
        punktzahl++;
        ergebnisElement.innerText = 'Richtig!';
    } else {
        ergebnisElement.innerText = 'Falsch!';
    }

    ergebnisContainer.style.display = 'block';
    document.getElementById('frageContainer').style.display = 'none';
}

function naechsteFrage() {
    const ergebnisContainer = document.getElementById('ergebnisContainer');
    ergebnisContainer.style.display = 'none';

    aktuelleFrageIndex++;
    if (aktuelleFrageIndex >= fragen.length) {
        zeigeErgebnis();
    } else {
        document.getElementById('frageContainer').style.display = 'block';
        zeigeFrage();
    }
}

function zeigeErgebnis() {
    const frageContainer = document.getElementById('frageContainer');
    frageContainer.style.display = 'none';

    const ergebnisElement = document.getElementById('ergebnis');
    ergebnisElement.innerText = `Du hast ${punktzahl} von ${fragen.length} Fragen richtig beantwortet.`;

    const naechsteFrageButton = document.getElementById('naechsteFrageButton');
    naechsteFrageButton.innerText = 'Neues Quiz starten';
    naechsteFrageButton.removeEventListener('click', naechsteFrage);
    naechsteFrageButton.addEventListener('click', startQuiz);

    const ergebnisContainer = document.getElementById('ergebnisContainer');
    ergebnisContainer.style.display = 'block';
}
