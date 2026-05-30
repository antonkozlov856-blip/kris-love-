const express = require("express");
const fetch = require("node-fetch");
const app = express();

const TOKEN = "8982908572:AAE87wJZInQbF1nistu2GZHRmtxWQNNVgV8";
const CHAT_ID = "8767539621";

const IMAGE_URL = "https://i.postimg.cc/mgt45CF3/IMG-2153.jpg";

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
  background: #0f172a;
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
  color: white;
}

.envelope {
  font-size: 90px;
  animation: float 2s infinite;
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
  align-items: center;
  justify-content: center;
  text-align: center;

  background: linear-gradient(-45deg, #ff4d6d, #1e293b, #ff006e);
  background-size: 400% 400%;
  animation: bg 8s ease infinite;
  color: white;
}

@keyframes bg {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.photo {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  margin: 10px;
}

/* 🔘 кнопки */
button {
  width: 220px;
  padding: 12px;
  margin: 6px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
}

#yes { background: #22c55e; }
#love { background: #ff006e; color: white; animation: pulse 1.2s infinite; }

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

#no {
  position: absolute;
  width: 120px;
  background: #ef4444;
}

/* 💬 чат */
.chat {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,0.6);
  padding: 10px;
  color: white;
  font-size: 14px;
}

.msg {
  margin: 4px 0;
}

/* 💖 финал */
#final {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #ff4d6d, #ff006e);
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#final h1 {
  font-size: 34px;
  animation: pulse 1.5s infinite;
}

/* ❤️ фон */
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

<!-- 💌 -->
<div id="secret" onclick="openLetter()">
  <div class="envelope">💌</div>
  <div>Нажми чтобы открыть письмо</div>
</div>

<!-- 💖 -->
<div id="app">

<h2>Крис 💖</h2>
<img class="photo" src="${IMAGE_URL}" />

<button id="yes" onclick="yes()">Да 😍</button>
<button id="love" onclick="love()">Я тебя люблю ❤️</button>
<button id="no" onmouseover="move()">Нет 😢</button>

</div>

<!-- 💬 ЧАТ -->
<div class="chat" id="chat">
  <div class="msg">Крис: ты придёшь? 😳</div>
</div>

<!-- 💖 ФИНАЛ -->
<div id="final">
  <h1>💘 Я жду тебя 💘</h1>
</div>

<script>

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

/* 💌 открыть */
function openLetter() {
  vibrate();
  document.getElementById("secret").style.display = "none";
  document.getElementById("app").style.display = "flex";
}

/* 📩 да */
function yes() {
  vibrate();

  const d = "согласилась";
  fetch("/yes");

  document.getElementById("app").style.display = "none";
  document.getElementById("chat").style.display = "none";
  document.getElementById("final").style.display = "flex";
}

/* ❤️ люблю */
function love() {
  vibrate();
  alert("❤️ Я тебя тоже ❤️");

  addChat("Она: я тебя тоже ❤️");
}

/* 💬 чат */
function addChat(text) {
  let div = document.createElement("div");
  div.className = "msg";
  div.innerText = text;
  document.getElementById("chat").appendChild(div);
}

/* 😈 кнопка */
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
    await fetch(
      "https://api.telegram.org/bot" +
      TOKEN +
      "/sendMessage?chat_id=" +
      CHAT_ID +
      "&text=" +
      encodeURIComponent("💘 ОНА СОГЛАСИЛАСЬ")
    );

    res.send("ok");
  } catch (e) {
    res.send("error");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));