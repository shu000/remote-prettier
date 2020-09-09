const express = require("express");
const bodyParser = require("body-parser");
const prettier = require("prettier");

const app = express();

app.use(express.static("./public"));
app.get("/", (_, res) => {
  res.sendFile("./public/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/prettier", (req, res) => {
  try {
    const formatted = prettier.format(req.body.content, { parser: "html" });
    res.set("Content-Type", "text/plain; charset=UTF-8");
    res.status(200).send(formatted).end();
  } catch (e) {
    res.set("Content-Type", "text/html; charset=UTF-8");
    res.status(200).send("正直むりやったわ。すまんやで。").end();
  }
});

app.listen(process.env.PORT || 3000);
