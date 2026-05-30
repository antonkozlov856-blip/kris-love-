const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>❤️</title>

      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          text-align: center;
        }

        .box {
          margin-top: 100px;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
          margin: 8px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
        }

        button {
          padding: 12px 20px;
          margin: 10px;
          font-size: 16px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        #yes {
          background: #22c55e;
          color: white;
        }

        #no {
          background: #ef4444;
          color: white;
          position: absolute;
        }
      </style>
    </head>

    <body>

      <div class="box">
        <h1>Крис, пойдешь со мной на свидание? 💖</h1>

        <input type="date" id="date"><br>
        <input type="time" id="time"><br>

        <button id="yes" onclick="yes()">Да 😍</button>
        <button id="no" onmouseover="move()">Нет 😢</button>
      </div>

      <script>
        function yes() {
          let d = document.getElementById("date").value;
          let t = document.getElementById("time").value;

          if (!d || !t) {
            alert("Выбери дату и время ❤️");
            return;
          }

          document.body.innerHTML = "<h1 style='margin-top:100px;'>❤️ Я буду ждать тебя ❤️</h1>";
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random() * (window.innerWidth - 100) + "px";
          b.style.top = Math.random() * (window.innerHeight - 50) + "px";
        }
      </script>

    </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started");
});