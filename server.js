const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
app.use(express.json()); // IMPORTANT

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.use(`/public`, express.static(`${__dirname}/public`));

app.get("/api/students", (request, response) => {
  fs.readFile(`${__dirname}/data/students.json`, function (err, data) {
    response.send(JSON.parse(data));
  });
});

app.get("/api/students/:id", (request, response) => {
  //  response.send(`<h1>${request.params.id}</h1>`);
  fs.readFile(`${__dirname}/data/students.json`, function (err, data) {
    const students = JSON.parse(data);
    response.send(
      students.find((element) => element.id === Number(request.params.id))
    );
  });
});

app.get("/api/status/active", (request, response) => {
  //  response.send(`<h1>${request.params.id}</h1>`);
  fs.readFile(`${__dirname}/data/students.json`, function (err, data) {
    const students = JSON.parse(data);
    response.send(students.filter((element) => element.status === true));
  });
});

app.get("/api/status/finished", (request, response) => {
  //  response.send(`<h1>${request.params.id}</h1>`);
  fs.readFile(`${__dirname}/data/students.json`, function (err, data) {
    const students = JSON.parse(data);
    response.send(students.filter((element) => element.status === false));
  });
});

app.post(`/`, (req, res) => {
  fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
    if (err) {
      console.log("error:", err);
      return res.status(500).send(err);
    } else {
      const students = JSON.parse(data);
      const newStudents = {
        id: students.length + 1,
        name: req.body.name,
        status: req.body.status,
      };
      students.push(newStudents);

      fs.writeFile(
        `${__dirname}/data/students.json`,
        JSON.stringify(students, null, 2),
        (err) => {
          if (err) {
            console.log("error", err);
            return res.status(500).send(err);
          } else {
            return res.send({ response: "done" });
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log(`server is running @: http://127.0.0.1:${port}`);
});
