const express = require("express");
const fetch = require("node-fetch");
const app = express();

// 🔥 ТВОИ ДАННЫЕ
const TOKEN = "ТВОЙ_ТГ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

// 📸 ФОТО
const IMAGE_URL = "https://i.imgur.com/yourphoto.jpg";

app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <title>❤️</title>

      <style>
        body {
          margin: 0;
          font-family: Arial;
          background: radial-gradient(circle at top, #ff4d6d, #0f172a);
          color: white;
          text-align: center;
          overflow: hidden;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          font-size: 22px;
          margin-bottom: 10px;
          padding: 0 10px;
        }

        img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 20px;
          margin: 10px 0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        .box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        input {
          width: 200px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          font-size: 16px;
        }

        button {
          width: 220px;
          padding: 12px;
          font-size: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }

        #yes { background: #22c55e; }
        #love { background: #f43f5e; }
        #no {
          background: #ef4444;
          position: absolute;
        }

        button:active {
          transform: scale(0.95);
        }

        .heart {
          position: absolute;
          font-size: 20px;
          animation: float 5s linear forwards;
        }

        @keyframes float {
          from { transform: translateY(100vh) scale(1); opacity: 1; }
          to { transform: translateY(-10vh) scale(0.5); opacity: 0; }
        }

        /* 💥 ВЗРЫВ */
        .boom {
          position: absolute;
          font-size: 24px;
          animation: boom 1s ease-out forwards;
        }

        @keyframes boom {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3) translateY(-100px); opacity: 0; }
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
          for (let i = 0; i < 25; i++) {
            let heart = document.createElement("div");
            heart.className = "boom";
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * window.innerWidth + "px";
            heart.style.top = Math.random() * window.innerHeight + "px";
            heart.style.fontSize = (20 + Math.random() * 30) + "px";

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1000);
          }
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random() * (window.innerWidth - 100) + "px";
          b.style.top = Math.random() * (window.innerHeight - 50) + "px";
        }

        // 💖 фоновые сердечки
        setInterval(() => {
          let heart = document.createElement("div");
          heart.className = "heart";
          heart.innerHTML = "❤️";
          heart.style.left = Math.random() * 100 + "vw";
          heart.style.fontSize = (10 + Math.random() * 20) + "px";

          document.body.appendChild(heart);

          setTimeout(() => heart.remove(), 5000);
        }, 300);
      </script>

    </body>
  </html>
  `);
});

// 📩 TELEGRAM
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