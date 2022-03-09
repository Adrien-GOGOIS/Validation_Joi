const express = require("express");
const app = express();

app.use(express.json());

// Import router d'un autre fichier JS
const usersRouter = require("./routers/usersRouter.js");

// SECTIONS DANS L'API
app.use("/users", usersRouter);

// LISTEN :
app.listen(8000, () => {
  console.log("LISTENING.....");
});
