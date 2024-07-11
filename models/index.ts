import express from "express";
import { App } from "../app";
const dubito = new App();
const app1 = express();
const server = express.json();
const port = process.env.port || 3000;
const baseURL = process.env.BASE_URL || "http://localhost:3000";
app1.use(server);
app1.get("/", (req, res) => {
  res.send("hello world");
});
app1.post("/api/auth/register", function (req, res) {
  const result = dubito.register(req.body.email, req.body.password);
  if (result) res.send("utente registrato correttamente");
  else res.send("utente non registrato");
});

app1.post("/api/auth/login", function (req, res) {
  const result = dubito.login(
    req.body.email,
    req.body.password,
    req.body.id_device
  );
  if (result) res.send("success result");
  else res.send("utente non loggato");
});
app1.post("/api/annunci/createad", function (req, res) {
  const result = dubito.createAd(
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.status,
    req.body.price,
    req.body.photo,
    req.body.address,
    req.body.sold,
    req.body.phone,
    req.body.referenceKeyUtenti
  );
  if (result) res.send("annuncio aggiunto correttamente");
  else res.send("non aggiunto");

  app1.listen(3000, () =>
    console.log("server in ascolto sulla porta ${baseURL}:${port}")
  );
});
app1.post("/api/auth/logout", function (req, res) {
  const token = req.body.token;
  const success = dubito.logout(token);
  if (success) res.send("utente loggato");
  else res.send("utente non loggato");
});

app1.delete("/api/annunci", function (req, res) {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Token invalido" });
  const result = dubito.deleteAd(
    parseInt(req.headers.authorization.toString()),
    req.body.referenceKeyUtenti
  );
  if (result) res.send("annuncio eliminato");
  else res.send("annuncio non eliminato");
});
app1.listen(3000, () =>
  console.log("server in ascolto sulla porta ${baseURL}:${port}")
);
