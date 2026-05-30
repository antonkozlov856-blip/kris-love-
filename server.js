const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Крис, пойдешь со мной на свидание? ❤️");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});