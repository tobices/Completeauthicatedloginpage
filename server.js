const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");
const app = express();
var corsOptions = { origin: "http://localhost:8081" };

app.use(cors(corsOptions));
//Parse requests of content-type -application/json
app.use(express.json());
//Parse requests of content-type - application
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "webmanz-session",
    secret: "COOKIE-SECRET", // USE AS A SECRET ENVIROMENT VARIABLE
    httpOnly: true,
  })
);
// connecting monoogse/mongodb
const db = require("./app/models");
const { initialize } = require("passport");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //save details
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  ///pick error message
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added user to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

//SIMPLEROUTES
app.get("/", (req, res) => {
  res.json({ message: "Welcome to webmanz application." });
});

//ROUTES
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//set port , listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
