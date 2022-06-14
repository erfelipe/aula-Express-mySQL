const express = require("express");

const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");

const mysql_connector = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const connection = mysql_connector.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port_mysql,
});

app.get("/", (req, res) => {
  console.log("Response ok.");
  res.send("Ok");
});

app.get("/allUsers", (req, res) => {
  try {
    connection.query("select * from Usuarios", function (error, results) {
      console.log("query response is ", results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/:id", (req, res) => {
  try {
    connection.query("select * from Usuarios where id = ?", [req.params.id] , function (error, results) {
      console.log("query response is ", results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", (req, res) => {
  try {
    connection.query("delete from Usuarios where id = ?", [req.params.id] , function (error, results) {
      console.log("query response is ", results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/new", (req, res) => {
  try {
    const params = req.body;
    connection.query("insert into Usuarios set ?", params , function (error, results) {
      console.log("query response is ", results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/:id", (req, res) => {
  try {
    const {id, nome, email} = req.body;
    connection.query("update Usuarios set name=?, email=? where id = ?", [nome, email, id], function (error, results) {
      console.log("query response is ", results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
