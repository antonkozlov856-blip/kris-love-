const express = require("express");
const fetch = require("node-fetch");
const app = express();

// 🔥 ВСТАВЬ СЮДА
const TOKEN = "ТВОЙ_ТГ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

// 📸 СЮДА ВСТАВЬ ССЫЛКУ НА ФОТКУ
const IMAGE_URL = "https://i.imgur.com/yourphoto.jpg";

app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>❤️</title>

      <style>
        body {
          margin: 0;
          font-family: Arial;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          text-align: center;
          overflow: hidden;
        }

        h1 {
          margin-top: 40px;
          font-size: 26px;
        }

        img {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 20px;
          margin-top: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .box {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        input {
          padding: 10px;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          width: 200px;
        }

        button {
          padding: 12px 18px;
          font-size: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: 0.2s;
          width: 220px;
        }

        #yes { background: #22c55e; }
        #love { background: #f43f5e; }
        #no {
          background: #ef4444;
          position: absolute;
        }

        button:hover {
          transform: scale(1.05);
        }

        @keyframes float {
          from { transform: translateY(100vh); }
          to { transform: translateY(-10vh); }
        }

        .heart {
          position: absolute;
          animation: float 6s linear infinite;
        }
      </style>
    </head>

    <body>

      <h1>Крис, пойдешь со мной на свидание? 💖</h1>

      <img src="${IMAGE_URL}" />

      <div class="box">
        <input type="date" id="date">
        <input type="time" id="time">

        <button id="yes" onclick="yes()">Да 😍</button>
        <button id="love" onclick="love()">Я люблю тебя ❤️</button>
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

        function love() {
          alert("❤️ Я тоже тебя люблю ❤️");
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random() * (window.innerWidth - 100) + "px";
          b.style.top = Math.random() * (window.innerHeight - 50) + "px";
        }

        setInterval(() => {
          let heart = document.createElement("div");
          heart.className = "heart";
          heart.innerHTML = "❤️";
          heart.style.left = Math.random() * 100 + "vw";
          heart.style.fontSize = (Math.random() * 20 + 10) + "px";

          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 6000);
        }, 400);
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
    res.send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));