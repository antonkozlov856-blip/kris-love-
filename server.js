const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>❤️</title>
        <style>
          body {
            background: #0f172a;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial;
            text-align: center;
          }
          button {
            padding: 15px 25px;
            font-size: 18px;
            margin: 10px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
          }
          .yes { background: #22c55e; }
          .no { background: #ef4444; }
        </style>
      </head>
      <body>
        <div>
          <h1>Крис, пойдешь со мной на свидание? 💖</h1>
          <button class="yes" onclick="yes()">Да 😍</button>
          <button class="no" onclick="no()">Нет 😢</button>
        </div>

        <script>
          function yes() {
            document.body.innerHTML = "<h1>УРАААА 🎉❤️</h1>";
          }

          function no() {
            document.body.innerHTML = "<h1>Ты просто не туда нажала 😏</h1>";
          }
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});