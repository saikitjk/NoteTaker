const express = require("express");

// Tells node that we are creating an 'express' server
const app = express();

// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of 'route' files.
// These routes give our server a 'map' of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
// =============================================================================
// LISTENER
// The below code effectively 'starts' our server
// =============================================================================

app.listen(PORT, function () {
  console.log("Server is now running on: http://localhost:" + PORT);
});
