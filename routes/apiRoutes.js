const fs = require("fs");
const path = require("path");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  //console.log("Test api route is working");
  fs.readFile("./db/db.json", "utf8", function (err, res) {
    if (err) throw err;

    const noteData = JSON.parse(res);
    //console.log("current note data " + JSON.stringify(noteData));

    app.get("/api/notes", function (req, res) {
      res.json(noteData);
    });

    //push to array
    app.post("/api/notes", function (req, res) {
      const newNoteData = req.body;
      noteData.push(newNoteData);
      updateDB();
      return console.log("New note added = " + newNoteData.title);
    });

    app.get("/api/notes/:id", function (req, res) {
      res.json(noteData[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
      noteData.splice(req.params.id, 1);
      updateDB();
      return console.log("Note " + req.params.id + " deleted");
    });

    ///
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // If no matching route is found default to home
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    ///

    function updateDB() {
      fs.writeFile("./db/db.json", JSON.stringify(noteData, "\t"), (err) => {
        if (err) throw err;
        console.log("pushed to the db file");
        return true;
      });
    }
  });
};
