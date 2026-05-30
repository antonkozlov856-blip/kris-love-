const express = require("express");
const app = express();

global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "ТВОЙ_ТГ_БОТ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial;
          text-align: center;
          overflow: hidden;
        }
        button {
          padding: 15px 25px;
          font-size: 18px;
          margin: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          position: absolute;
        }
        #yes { background: #22c55e; top: 60%; left: 45%; }
        #no { background: #ef4444; top: 60%; left: 55%; }

        input {
          padding: 10px;
          font-size: 16px;
          margin-top: 20px;
          border-radius: 8px;
          border: none;
        }
      </style>
    </head>

    <body>
      <h1>Крис, пойдешь со мной на свидание? 💖</h1>

      <input type="date" id="date">
      <input type="time" id="time">

      <button id="yes" onclick="yes()">Да 😍</button>
      <button id="no" onmouseover="moveButton()">Нет 😢</button>

      <script>
        function yes() {
          const date = document.getElementById("date").value;
          const time = document.getElementById("time").value;

          if (!date || !time) {
            alert("Выбери дату и время 😏");
            return;
          }

          fetch('/yes?date=' + date + '&time=' + time);

          document.body.innerHTML = "<h1>УРААА ❤️ ЖДУ ТЕБЯ 😍</h1>";
        }

        function moveButton() {
          const btn = document.getElementById("no");
          const x = Math.random() * (window.innerWidth - 100);
          const y = Math.random() * (window.innerHeight - 50);
          btn.style.left = x + "px";
          btn.style.top = y + "px";
        }
      </script>
    </body>
  </html>
  `);
});

app.get("/yes", async (req, res) => {
  const date = req.query.date;
  const time = req.query.time;

  const text = encodeURIComponent(
    "ОНА СКАЗАЛА ДА 😳❤️\\nДата: " + date + "\\nВремя: " + time
  );

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);

  res.send("ok");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});