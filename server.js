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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>❤️</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  overflow: hidden;
  background: #0f172a;
}

/* 💌 */
#secret {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #ff4d6d, #0f172a);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 9999;
}

.envelope {
  font-size: 90px;
  animation: float 2s infinite;
}

@keyframes float {
  50% { transform: translateY(-10px); }
}

/* 🌌 */
#app {
  display: none;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  background: linear-gradient(-45deg, #ff4d6d, #1e293b, #ff006e);
  background-size: 400% 400%;
  animation: bg 8s infinite;
}

@keyframes bg {
  50% { background-position: 100% 50%; }
}

.photo {
  width: 160px;
  height: 160px;
  border-radius: 20px;
}

input {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  border: none;
}

button {
  width: 220px;
  padding: 12px;
  margin: 6px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
}

#yes { background: #22c55e; }

#love {
  background: #ff006e;
  color: white;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  50% { transform: scale(1.08); }
}

#no {
  position: absolute;
  width: 120px;
  background: #ef4444;
}

/* 💖 уведомление */
#notif {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  transition: 0.4s;
}

/* 💘 финал */
#final {
  display: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #ff4d6d, #ff006e);
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#final h1 {
  font-size: 36px;
  animation: pulse 1.5s infinite;
}

/* ❤️ фон */
.heart {
  position: absolute;
  animation: floatHeart 5s linear forwards;
}

@keyframes floatHeart {
  from { transform: translateY(100vh); }
  to { transform: translateY(-10vh); opacity: 0; }
}
</style>
</head>

<body>

<div id="notif">❤️ Я тебя тоже ❤️</div>

<!-- 💌 -->
<div id="secret" onclick="openLetter()">
  <div class="envelope">💌</div>
  <div>Нажми чтобы открыть письмо</div>
</div>

<!-- 💖 -->
<div id="app">
<h2>Крис 💖</h2>

<img class="photo" src="${IMAGE_URL}" />

<input type="date" id="date">
<input type="time" id="time">

<button id="yes" onclick="yes()">Да 😍</button>
<button id="love" onclick="love()">Я тебя люблю ❤️</button>
<button id="no" onmouseover="move()">Нет 😢</button>
</div>

<!-- 💖 -->
<div id="final">
  <h1>💘 Я жду тебя 💘</h1>
</div>

<script>

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(200);
}

function openLetter() {
  vibrate();
  document.getElementById("secret").style.display = "none";
  document.getElementById("app").style.display = "flex";
}

/* ❤️ уведомление */
function showNotif() {
  let n = document.getElementById("notif");
  n.style.transform = "translateX(-50%) translateY(0)";
  setTimeout(() => {
    n.style.transform = "translateX(-50%) translateY(-100px)";
  }, 2000);
}

/* ❤️ люблю */
function love() {
  vibrate();
  showNotif();

  for (let i = 0; i < 20; i++) {
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

/* 😈 */
function move() {
  let b = document.getElementById("no");
  b.style.left = Math.random() * (window.innerWidth - 100) + "px";
  b.style.top = Math.random() * (window.innerHeight - 50) + "px";
}

/* 💘 да */
function yes() {
  vibrate();

  let d = document.getElementById("date").value;
  let t = document.getElementById("time").value;

  if (!d || !t) {
    alert("Выбери дату ❤️");
    return;
  }

  fetch("/yes?date=" + d + "&time=" + t);

  setTimeout(() => {
    document.getElementById("app").style.display = "none";
    document.getElementById("final").style.display = "flex";
  }, 500);
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
}, 300);

</script>

</body>
</html>
  `);
});

/* 📩 TELEGRAM */
app.get("/yes", async (req, res) => {
  try {
    const text =
      "💘 ОНА СОГЛАСИЛАСЬ\\n📅 " +
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
  } catch {
    res.send("error");
  }
});

app.listen(process.env.PORT || 3000);