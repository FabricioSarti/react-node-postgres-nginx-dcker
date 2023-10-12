//carga environment
const keys = require("./keys");

//aplicacion express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const application = express();
application.use(cors());
application.use(bodyParser.json());

//setup cliente postgres

const { Pool } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("connect", client => {
    client
        .query("CREATE TABLE IF NOT EXIST values (number INT) ")
        .catch(error => console.log("error al conectar con postgres ", error));
})

//Express routes
application.get("/", (req, res) => {
    res.send("hello");
});

application.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");
    res.send(values);
});

application.post("values", async (req, res) => {
    if (!req.body.value) res.send({ working: false });

    pgClient.query("INSERT INTO values(number) values ($1)", [req.body.value]);

    res.send({ working: true });
});

application.listen(5000, error => {
    console.log("Escuchando... en el puerto 5000")
});