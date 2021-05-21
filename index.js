const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Euodeiosalad@1",
  database: "nexpdb",
});

app.post("/register", (req, res) => {
  const cpf = req.body.cpf;
  const password = req.body.password;
  const email = req.body.email;
  const nascdate = req.body.nascdate;
  const nome = req.body.nome;

  db.query(
    "INSERT INTO user (user_cpf, user_senha, user_email, user_nascdate, user_nome ) VALUES (?,?,?,?,?)",
    [cpf, password, email, nascdate, nome],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const cpf = req.body.cpf;
  const password = req.body.password;
  db.query(
    "SELECT * FROM user WHERE user_cpf = ? AND user_senha = ?",
    [cpf, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Usuário ou senha inválidos" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("servidor rodando da porta 3001...");
});
