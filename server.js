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
<title>💌</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  overflow: hidden;
  height: 100vh;
}

/* 💌 экран письма */
#secret {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #ff4d6d, #0f172a);
  color: white;
}

.envelope {
  font-size: 80px;
  animation: float 2s infinite ease-in-out;
  cursor: pointer;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

/* 🌌 основной экран */
#app {
  display: none;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  text-align: center;
}

.photo {
  width: 170px;
  height: 170px;
  border-radius: 20px;
  object-fit: cover;
  margin: 10px;
  animation: pop 1s ease;
}

@keyframes pop {
  0% { transform: scale(0.3); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* 💬 чат */
.chat {
  margin-top: 10px;
  width: 80%;
  max-width: 300px;
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  padding: 10px;
  min-height: 60px;
}

.message {
  display: inline-block;
  font-size: 16px;
  white-space: pre-wrap;
}

/* 💓 кнопки */
button {
  width: 220px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  margin-top: 10px;
}

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

#yes {
  background: #22c55e;
}

#no {
  position: absolute;
  background: #ef4444;
  width: 120px;
}

/* ❤️ сердца */
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
<div id="secret">
  <div class="envelope" onclick="openLetter()">💌</div>
  <div>Нажми чтобы открыть письмо</div>
</div>

<!-- 💖 сайт -->
<div id="app">

<h1>Крис 💖</h1>

<img class="photo" src="${IMAGE_URL}" />

<!-- 💬 чат -->
<div class="chat">
  <span class="message" id="msg"></span>
</div>

<button id="yes" onclick="yes()">Да 😍</button>
<button id="love" onclick="love()">Я люблю тебя ❤️</button>
<button id="no" onmouseover="move()">Нет 😢</button>

</div>

<script>

/* 💌 открыть */
function openLetter() {
  document.getElementById("secret").style.display = "none";
  document.getElementById("app").style.display = "flex";

  startTyping(); // 💬 запускаем печатание
}

/* 💬 эффект печатания */
function startTyping() {
  let text = "Привет 💖\nЯ долго думал...\nИ понял, что ты мне очень нравишься ❤️\nПойдёшь со мной? 😳";
  let i = 0;

  function type() {
    if (i < text.length) {
      document.getElementById("msg").innerHTML += text[i];
      i++;
      setTimeout(type, 60);
    }
  }

  type();
}

/* 😍 да */
function yes() {
  let d = document.getElementById("date")?.value;
  let t = document.getElementById("time")?.value;

  fetch('/yes?date=' + (d||"") + '&time=' + (t||""));

  document.body.innerHTML = "<h1>💘 Я жду тебя 💘</h1>";
}

/* ❤️ взрыв */
function love() {
  for (let i = 0; i < 30; i++) {
    let el = document.createElement("div");
    el.className = "heart";
    el.innerHTML = "❤️";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.top = Math.random() * window.innerHeight + "px";
    el.style.fontSize = (20 + Math.random() * 30) + "px";

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
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

// 📩 telegram
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