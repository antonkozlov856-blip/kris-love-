const express = require("express");
const fetch = require("node-fetch"); // важно
const app = express();

// 🔥 ВСТАВЬ СЮДА
const TOKEN = "ТВОЙ_ТГ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

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
          overflow: hidden;
        }

        h1 {
          margin-top: 80px;
          font-size: 30px;
          animation: fade 2s ease;
        }

        .box {
          margin-top: 30px;
        }

        input {
          padding: 10px;
          margin: 8px;
          border-radius: 10px;
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
          transition: 0.2s;
        }

        #yes {
          background: #22c55e;
        }

        #no {
          background: #ef4444;
          position: absolute;
        }

        button:hover {
          transform: scale(1.1);
        }

        @keyframes fade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .heart {
          position: absolute;
          animation: float 6s linear infinite;
          color: pink;
        }

        @keyframes float {
          from { transform: translateY(100vh); }
          to { transform: translateY(-10vh); }
        }
      </style>
    </head>

    <body>

      <h1>Крис, пойдешь со мной на свидание? 💖</h1>

      <div class="box">
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

          fetch('/yes?date=' + d + '&time=' + t);

          document.body.innerHTML = "<h1 style='margin-top:100px;'>💘 Я буду ждать тебя 💘</h1>";
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random() * (window.innerWidth - 100) + "px";
          b.style.top = Math.random() * (window.innerHeight - 50) + "px";
        }

        // 💘 сердечки (лёгкие)
        setInterval(() => {
          let heart = document.createElement("div");
          heart.className = "heart";
          heart.innerHTML = "❤️";
          heart.style.left = Math.random() * 100 + "vw";
          heart.style.fontSize = (Math.random() * 20 + 10) + "px";

          document.body.appendChild(heart);

          setTimeout(() => heart.remove(), 6000);
        }, 500);
      </script>

    </body>
  </html>
  `);
});

// 📩 Telegram
app.get("/yes", async (req, res) => {
  try {
    const text = encodeURIComponent(
      "💘 ОНА СОГЛАСИЛАСЬ!\\n📅 Дата: " + req.query.date + "\\n⏰ Время: " + req.query.time
    );

    await fetch(
      "https://api.telegram.org/bot" +
      TOKEN +
      "/sendMessage?chat_id=" +
      CHAT_ID +
      "&text=" +
      text
    );

    res.send("ok");
  } catch (e) {
    console.log(e);
    res.send("error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started");
});