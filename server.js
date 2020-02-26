var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));

// Set up routes //

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(readDatabase());
});

//Post note

app.post("/api/notes", function (req, res) {
  const postNewNote = req.body;

  let notes = readDatabase();

  let incrementId = 1;
  if (notes.length > 0) {
    incrementId = notes[notes.length - 1].id + 1;
  }
  postNewNote.id = incrementId;
  notes.push(postNewNote);

  return updateDatabase(res, notes, postNewNote);
});

// Delete note

app.delete("/api/notes/:id", function (req, res) {
  const deleteId = parseInt(req.params.id);
  let notes = readDatabase();

  const index = notes.findIndex((note) => note.id === deleteId);

  notes.splice(index, 1);

  return updateDatabase(res, notes, "Note removed!");
});


// Listening Port //
app.listen(PORT, function () {
  console.log("Server is listening on PORT: " + PORT);
});

// DB functions //

function updateDatabase(res, notes, resMsg) {
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
    return res.status(200).send(resMsg);
  });
}

function readDatabase() {
  const data = fs.readFileSync('./db/db.json', "utf-8");
  let notes = [];
  if (data !== "") notes = JSON.parse(data);

  return notes;
}; 