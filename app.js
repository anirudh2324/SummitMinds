const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "prize.json");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/name/:firstname", async (request, response) => {
  const { firstname } = request.query;
  const getPrizeWinner = `
    SELECT
      *
    FROM
      prize
    where
        name = ${firstname}`;
  const prizeWinner = await db.get(getPrizeWinner);
  response.send(prizeWinner);
});

app.get("/name/:year", async (request, response) => {
  const { year } = request.query;
  const getPrizeWinner = `
    SELECT
      *
    FROM
      prize
    where
        year = ${year}`;
  const prizeWinner = await db.get(getPrizeWinner);
  response.send(prizeWinner);
});

app.get("/name/:year", async (request, response) => {
  const { year, category } = request.query;
  const getPrizeWinner = `
    SELECT
      *
    FROM
      prize
    where
        year = ${year},
        AND 
        category = ${category}`;
  const prizeWinner = await db.get(getPrizeWinner);
  response.send(prizeWinner);
});

app.get("/name/", async (request, response) => {
  const { year, category } = request.query;
  const getPrizeWinner = `
    SELECT
      *
    FROM
      prize
    ORDER BY
        name`;
  const prizeWinner = await db.all(getPrizeWinner);
  response.send(prizeWinner);
});

module.exports = app;
