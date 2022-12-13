const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "todoApplication.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//GET TODOS API

app.get("/todos/", async (request, response) => {
  const { priority = "", status = "", search_q = "" } = request.query;
  const dbQry = `
    select *
    from
    todo
    WHERE
    status LIKE '%${status}%'
    AND
    priority LIKE '%${priority}%'
    AND
    todo LIKE '%${search_q}%'
    ;
  `;
  const dbRes = await db.all(dbQry);
  response.send(dbRes);
});
