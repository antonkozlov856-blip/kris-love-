const express = require("express");
const app = express();

global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "8982908572:AAE87wJZInQbF1nistu2GZHRmtxWQNNVgV8";
const CHAT_ID = "8767539621";

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>❤️</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        text-align: center;
      }

      h1 {
        margin-top: 80px;
        font-size: 40px;
        animation: fadeIn 2s ease;
      }

      .container {
        margin-top: 30px;
      }

      input {
        padding: 10px;
        font-size: 16px;
        margin: 10px;
        border-radius: 10px;
        border: none;
      }

      button {
        padding: 15px 25px;
        font-size: 18px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        position: absolute;
        transition: 0.2s;
      }

      #yes {
        background: #22c55e;
        top: 65%;
        left: 40%;
      }

      #no {
        background: #ef4444;
        top: 65%;
        left: 55%;
      }

      .heart {
        position: absolute;
        color: pink;
        animation: float 6s linear infinite;
      }

      @keyframes float {
        from { transform: translateY(100vh); }
        to { transform: translateY(-10vh); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>
  </head>

  <body>

    <h1>Крис, пойдешь со мной на свидание? 💖</h1>

    <div class="container">
      <input type="date" id="date">
      <input type="time" id="time">
    </div>

    <button id="yes" onclick="yes()">Да 😍</button>
    <button id="no" onmouseover="moveButton()">Нет 😢</button>

    <script>
      function yes() {
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!date || !time) {
          alert("Выбери дату и время ❤️");
          return;
        }

        fetch('/yes?date=' + date + '&time=' + time);

        document.body.innerHTML = "<h1>Я буду ждать тебя ❤️✨</h1>";
      }

      function moveButton() {
        const btn = document.getElementById("no");
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        btn.style.left = x + "px";
        btn.style.top = y + "px";
      }

      // 💘 сердечки
      setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
      }, 300);
    </script>

  </body>
  </html>
  `);
});

const express = require("express");
const app = express();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
  const text = encodeURIComponent(
    "💘 ОНА СОГЛАСИЛАСЬ!\n📅 Дата: " + date + "\n⏰ Время: " + time
  );

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);

  res.send("ok");
});