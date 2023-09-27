import express from 'express';
import bodyParser from 'body-parser';
const app = express();

// Body Parser konfigurieren
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Statische Dateien bereitstellen (z. B. CSS- oder Bilddateien)
app.use(express.static('public'));

// Fragen und Antworten


// Aktuelle Frage und Punktzahl initialisieren
let aktuelleFrageIndex = 0;
let punktzahl = 0;




// Routen für die Quizspielanwendung
app.get('/', (req, res) => {
  res.sendFile("test.html", { root: "./" })

})


app.get("/quiz", function (req, res) {
  res.sendFile("Quizapp.html", { root: "./" })
})


// offen .................

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
})
