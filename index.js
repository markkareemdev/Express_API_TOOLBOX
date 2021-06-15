const express = require("express");
const app = express();
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logging = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logging);
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled... ");
}

console.log(process.env.NODE_ENV);
console.log(`Application Name: ${config.get("name")}`);
console.log(`Application Mail: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
