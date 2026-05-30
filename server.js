const express = require("express");
const fetch = require("node-fetch");
const app = express();

const TOKEN = "ТВОЙ_ТГ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

const IMAGE_URL = "https://i.imgur.com/yourphoto.jpg";

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>❤️</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  overflow: hidden;
  height: 100vh;
}

/* 💌 экран письма */
#secret {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at top, #ff4d6d, #0f172a);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.envelope {
  font-size: 90px;
  cursor: pointer;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* 🌌 основной экран */
#app {
  display: none;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: linear-gradient(-45deg, #ff4d6d, #1e293b, #0f172a, #ff006e);
  background-size: 400% 400%;
  animation: bg 10s ease infinite;
  color: white;
}

@keyframes bg {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

h1 {
  font-size: 22px;
}

.photo {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  object-fit: cover;
  margin: 10px;
}

/* 📅 поля */
input {
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin: 5px;
}

/* 🔘 кнопки */
button {
  width: 220px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  margin: 8px;
  font-size: 16px;
}

/* 💚 да */
#yes {
  background: #22c55e;
}

/* ❤️ пульс */
#love {
  background: #ff006e;
  color: white;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

/* 😈 убегающая */
#no {
  background: #ef4444;
  position: absolute;
  width: 120px;
}

/* ❤️ сердечки */
.heart {
  position: absolute;
  animation: floatHeart 5s linear forwards;
}

@keyframes floatHeart {
  from { transform: translateY(100vh); opacity: 1; }
  to { transform: translateY(-10vh); opacity: 0; }
}

</style>
</head>

<body>

<!-- 💌 письмо -->
<div id="secret" onclick="openLetter()">
  <div class="envelope">💌</div>
  <div style="color:white;margin-top:10px;">Нажми чтобы открыть письмо</div>
</div>

<!-- 💖 сайт -->
<div id="app">

<h1>Крис 💖</h1>

<img class="photo" src="${IMAGE_URL}" />

<!-- 📅 ДАТА -->
<input type="date" id="date">
<input type="time" id="time">

<button id="yes" onclick="yes()">Да 😍</button>
<button id="love" onclick="love()">Я тебя люблю ❤️</button>
<button id="no" onmouseover="move()">Нет 😢</button>

</div>

<script>

/* 💌 открыть */
function openLetter() {
  document.getElementById("secret").style.display = "none";
  document.getElementById("app").style.display = "flex";
}

/* 📩 telegram */
function yes() {
  let d = document.getElementById("date").value;
  let t = document.getElementById("time").value;

  if (!d || !t) {
    alert("Выбери дату и время ❤️");
    return;
  }

  fetch("/yes?date=" + d + "&time=" + t);

  document.body.innerHTML = "<h1>💘 Я жду тебя 💘</h1>";
}

/* ❤️ любовь */
function love() {
  for (let i = 0; i < 25; i++) {
    let h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = Math.random() * window.innerWidth + "px";
    h.style.top = Math.random() * window.innerHeight + "px";
    h.style.fontSize = (20 + Math.random() * 30) + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

/* 😈 кнопка убегает */
function move() {
  let b = document.getElementById("no");
  b.style.left = Math.random() * (window.innerWidth - 100) + "px";
  b.style.top = Math.random() * (window.innerHeight - 50) + "px";
}

/* ❤️ фон */
setInterval(() => {
  let h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = (10 + Math.random() * 20) + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 250);

</script>

</body>
</html>
  `);
});

/* 📩 TELEGRAM */
app.get("/yes", async (req, res) => {
  try {
    const text =
      "💘 ОНА СОГЛАСИЛАСЬ!\\n📅 " +
      req.query.date +
      "\\n⏰ " +
      req.query.time;

    await fetch(
      "https://api.telegram.org/bot" +
      TOKEN +
      "/sendMessage?chat_id=" +
      CHAT_ID +
      "&text=" +
      encodeURIComponent(text)
    );

    res.send("ok");
  } catch (e) {
    res.send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));