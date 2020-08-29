const path = require("path");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  console.log("Test html route is working");
  // HTML GET Requests
  // Below code handles when users 'visit' a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html "));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
