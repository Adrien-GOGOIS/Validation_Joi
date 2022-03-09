const express = require("express");
const app = express();

app.use(express.json());

const users = [
  {
    username: "Adrien",
    email: "canadasec@outlook.fr",
    age: 33,
    city: "Paris",
  },
];

// A chaque requête :
app.use((req, res, next) => {
  console.log("requête reçu");
  next();
});

// Routes GET :
app.get("/", (req, res, next) => {
  res.json(users);
});

// Routes POST :
app.post("/user", (req, res, next) => {
  users.push(req.body);
});

// LISTEN :
app.listen(8000, (req, res) => {
  console.log("LISTENING.....");
});
