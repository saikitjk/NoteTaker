const fs = require("fs");

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
      res.json(noteData[req.object.id]);
    });

    app.get("/api/notes/:id", function (req, res) {
      noteData.splice(req.object.id, 1);
      updateDB();
      console.log("Note " + req.object.id + " deleted");
    });

    function updateDB() {
      fs.writeFile("./db/db.json", JSON.stringify(noteData, "\t"), (err) => {
        if (err) throw err;
        console.log("pushed to the db file");
        return true;
      });
    }
  });
};
