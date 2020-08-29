const path = require("path");
// need fs to read and write to files
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  fs.readFile("./db/db.json", "uft8", function (req, res) {
    if (err) throw err;

    const noteData = JSON.parse(res);
    console.log("current note data" + noteData);

    app.get("../public/assets/notes", function (req, res) {
      res.json(noteData);
    });

    app.post("../public/assets/notes", function (req, res) {
      const newNoteData = req.body;
      noteData.push(newNoteData);
      updateDB();
      console.log("New note added = " + newNoteData.title);
    });

    app.post("/api/clear", function (req, res) {
      // Empty out the arrays of data
      tableData.length = 0;
      waitListData.length = 0;

      res.json({ ok: true });
    });

    function updateDB() {
      fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
        if (err) throw err;
        return console.log("pushed to the db file");
      });
    }
  });
};
