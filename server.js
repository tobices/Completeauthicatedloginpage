const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
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

//ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Welcome to webmanz application." });
});

//set port , listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
