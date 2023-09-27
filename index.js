import express from 'express';
import bodyParser from 'body-parser';
const app = express();

// Body Parser konfigurieren
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Statische Dateien bereitstellen (z. B. CSS- oder Bilddateien)
app.use(express.static('public'));

// Fragen und Antworten
const fragen = [
  {
    frage: 'Welche Farbe hat der Himmel?',
    antworten: ['Blau', 'Grün', 'Rot', 'Gelb'],
    richtig: 'Blau'
  },
  // Weitere Fragen hier hinzufügen...
];

// Aktuelle Frage und Punktzahl initialisieren
let aktuelleFrageIndex = 0;
let punktzahl = 0;

// Routen für die Quizspielanwendung
app.get('/', (req, res) => {
  res.send(`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Roboto', sans-serif;
        background-color: #f8f9fa;
      }
      .container {
        text-align: center;
        margin-top: 100px;
      }
      h1 {
        font-size: 36px;
        margin-bottom: 20px;
      }
      .start-button {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to the Quiz App</h1>
      <a href="/frage" class="btn btn-primary start-button">Start Quiz</a>
    </div>
  </body>
  </html>`);
});

app.get('/quiz', (req, res) => {
  const aktuelleFrage = fragen[aktuelleFrageIndex];
  res.send(`<html>
  <head>
    <title>Quiz</title>
  </head>
  <body>
    <h1>Quiz</h1>
    
    <div id="frage-container">
      <h2>Frage:</h2>
      <p id="frage"></p>
    </div>
    
    <div id="antworten-container">
      <h2>Antworten:</h2>
      <ul id="antworten"></ul>
    </div>
    
    <div id="ergebnis-container">
      <h2>Ergebnis:</h2>
      <p id="ergebnis"></p>
      <p id="richtigeAntwort"></p>
    </div>
    
    <div id="punktzahl-container">
      <h2>Punktzahl:</h2>
      <p id="punktzahl"></p>
    </div>
    
    <script>
      // JavaScript-Code, um mit dem Express-Server zu interagieren
      // Stelle sicher, dass du den entsprechenden JavaScript-Code für den Client bereitstellst, damit er richtig funktioniert
      
      // Funktion, um die aktuelle Frage anzuzeigen
      function zeigeFrage(frage) {
        document.getElementById("frage").textContent = frage;
      }
      
      // Funktion, um die Antworten anzuzeigen
      function zeigeAntworten(antworten) {
        var antwortenListe = document.getElementById("antworten");
        antwortenListe.innerHTML = ""; // Leere die vorherigen Antworten
        
        antworten.forEach(function(antwort) {
          var antwortElement = document.createElement("li");
          antwortElement.textContent = antwort;
          antwortenListe.appendChild(antwortElement);
        });
      }
      
      // Funktion, um das Ergebnis anzuzeigen
      function zeigeErgebnis(korrekt, richtigeAntwort) {
        var ergebnisText = korrekt ? "Richtig!" : "Falsch!";
        var ergebnisElement = document.getElementById("ergebnis");
        var richtigeAntwortElement = document.getElementById("richtigeAntwort");
        
        ergebnisElement.textContent = ergebnisText;
        
        if (!korrekt) {
          richtigeAntwortElement.textContent = "Die richtige Antwort ist: " + richtigeAntwort;
        } else {
          richtigeAntwortElement.textContent = "";
        }
      }
      
      // Funktion, um die Punktzahl anzuzeigen
      function zeigePunktzahl(punktzahl) {
        document.getElementById("punktzahl").textContent = punktzahl;
      }
      
      // Funktion, um die nächste Frage anzuzeigen oder das Quiz zu beenden
      function zeigeNaechsteFrage(quizBeendet) {
        if (quizBeendet) {
          document.getElementById("frage-container").style.display = "none";
          document.getElementById("antworten-container").style.display = "none";
          document.getElementById("ergebnis-container").style.display = "none";
          document.getElementById("punktzahl-container").style.display = "none";
          
          alert("Das Quiz ist beendet!");
        } else {
          // Setze die Anzeige zurück
          document.getElementById("frage").textContent = "";
          document.getElementById("antworten").innerHTML = "";
          document.getElementById("ergebnis").textContent = "";
          document.getElementById("richtigeAntwort").textContent = "";
          
          // Verstecke das Ergebnis und die richtige Antwort
          document.getElementById("ergebnis-container").style.display = "none";
          
          // Zeige die nächste Frage an
          // Hier kannst du den entsprechenden AJAX-Aufruf machen, um die nächste Frage vom Server abzurufen und die Anzeige zu aktualisieren
        }
      }
    </script>
  </body>
  </html>`);
});

app.post('/antwort', (req, res) => {
  const aktuelleFrage = fragen[aktuelleFrageIndex];
  const ausgewaehlteAntwort = req.body.antwort;
  
  if (ausgewaehlteAntwort === aktuelleFrage.richtig) {
    punktzahl++;
    res.json({ korrekt: true });
  } else {
    res.json({ korrekt: false, richtigeAntwort: aktuelleFrage.richtig });
  }
});

app.get('/punktzahl', (req, res) => {
  res.json({ punktzahl: punktzahl });
});

app.get('/naechsteFrage', (req, res) => {
  aktuelleFrageIndex++;
  if (aktuelleFrageIndex >= fragen.length) {
    res.json({ quizBeendet: true });
  } else {
    res.json({ quizBeendet: false });
  }
});

// Den Server starten
app.listen(3000, () => {
  console.log('Der Server ist gestartet und hört auf Port 3000.');
});
