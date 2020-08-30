const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  //console.log("Test api route is working");
  fs.readFile("./db/db.json", "utf8", function (err, res) {
    if (err) throw err;

    const noteData = JSON.parse(res);
    console.log("current note data " + JSON.stringify(noteData));

    app.get("/api/notes", function (req, res) {
      res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
      const newNoteData = req.body;
      noteData.push(newNoteData);
      updateDB();
      return console.log("New note added = " + newNoteData.title);
    });

    function updateDB() {
      fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
        if (err) throw err;
        return console.log("pushed to the db file");
      });
    }
  });
};
