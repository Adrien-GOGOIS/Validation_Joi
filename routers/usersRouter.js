const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());

// JOI
const Joi = require("joi");

// Ensuite on crée un schéma pour POST un user:
const schema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "fr", "io"] },
  }),
  age: Joi.number().min(10).required(),
  city: Joi.string().required(),
});

// Tableau d'users
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
// All users
router.get("/", (req, res, next) => {
  res.json(users);
});

// 1 user :
router.get("/:username", (req, res) => {
  const user = users.find((usr) => {
    return usr.username.toLowerCase() === req.params.username.toLowerCase();
  });

  res.json(user);
});

// GET user par ID :
router.get("/id/:id", (req, res) => {
  return res.json(users[req.params.id - 1]);
});

// GET user par email :
router.get("/email/:email", (req, res) => {
  const user = users.find((usr) => {
    return usr.email === req.params.email;
  });

  res.json(user);
});

// Routes POST :
router.post("/", (req, res, _next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  } else {
    users.push(req.body);
    res.json({
      message: "Ajout de l'utilisateur",
      users: users,
    });
  }
});

// On exporte le router
module.exports = router;
