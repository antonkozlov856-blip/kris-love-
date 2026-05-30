const express = require("express");
const app = express();

// 👉 ВСТАВЬ СЮДА СВОИ ДАННЫЕ
const TOKEN = "ТВОЙ_ТГ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

// главная страница
app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>❤️</title>
      <style>
        body {
          background: #111;
          color: white;
          text-align: center;
          font-family: Arial;
          padding-top: 100px;
        }

        button {
          padding: 15px;
          font-size: 18px;
          margin: 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        #no {
          position: absolute;
        }
      </style>
    </head>

    <body>

      <h1>Крис, пойдешь со мной на свидание? 💖</h1>

      <input type="date" id="date"><br><br>
      <input type="time" id="time"><br><br>

      <button onclick="yes()">Да 😍</button>
      <button id="no" onmouseover="move()">Нет 😢</button>

      <script>
        function yes() {
          let d = document.getElementById("date").value;
          let t = document.getElementById("time").value;

          if (!d || !t) {
            alert("Выбери дату и время ❤️");
            return;
          }

          fetch('/yes?date=' + d + '&time=' + t);

          document.body.innerHTML = "<h1>❤️ Я буду ждать тебя ❤️</h1>";
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random()*300 + "px";
          b.style.top = Math.random()*300 + "px";
        }
      </script>

    </body>
  </html>
  `);
});

// обработка "Да"
app.get("/yes", async (req, res) => {
  const date = req.query.date;
  const time = req.query.time;

  const text = encodeURIComponent(
    "💘 ОНА СОГЛАСИЛАСЬ!\n📅 Дата: " + date + "\n⏰ Время: " + time
  );

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);

  res.send("ok");
});

// запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});