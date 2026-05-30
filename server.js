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

/* 💌 СЕКРЕТНЫЙ ЭКРАН */
#secret {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at top, #ff4d6d, #0f172a);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
}

.envelope {
  font-size: 90px;
  cursor: pointer;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}

.text {
  color: white;
  margin-top: 10px;
}

/* 💥 ВЗРЫВ КОНВЕРТА */
.piece {
  position: absolute;
  font-size: 50px;
  animation: explode 0.8s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: scale(1) translate(0,0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.5) translate(var(--x), var(--y)) rotate(720deg);
    opacity: 0;
  }
}

/* 🌌 ОСНОВНОЙ САЙТ */
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

.photo {
  width: 170px;
  height: 170px;
  border-radius: 20px;
  object-fit: cover;
  margin: 10px;
}

h1 {
  font-size: 22px;
}

/* 💓 кнопка */
#love {
  width: 230px;
  padding: 14px;
  border: none;
  border-radius: 14px;
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
  width: 230px;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: #22c55e;
}

#no {
  position: absolute;
  width: 120px;
  border-radius: 12px;
  border: none;
  background: #ef4444;
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

<!-- 💌 КОНВЕРТ -->
<div id="secret" onclick="explodeLetter()">
  <div class="envelope">💌</div>
  <div class="text">Нажми чтобы открыть письмо</div>
</div>

<!-- 💖 САЙТ -->
<div id="app">

<h1>Крис 💖</h1>

<img class="photo" src="${IMAGE_URL}" />

<button id="yes">Да 😍</button>
<button id="love" onclick="love()">Я люблю тебя ❤️</button>
<button id="no" onmouseover="move()">Нет 😢</button>

</div>

<script>

/* 💥 АНИМАЦИЯ РАЗЛЁТА КОНВЕРТА */
function explodeLetter() {
  const secret = document.getElementById("secret");

  for (let i = 0; i < 12; i++) {
    let part = document.createElement("div");
    part.className = "piece";
    part.innerHTML = "💌";

    part.style.left = "50%";
    part.style.top = "50%";

    let x = (Math.random() * 400 - 200) + "px";
    let y = (Math.random() * 400 - 200) + "px";

    part.style.setProperty("--x", x);
    part.style.setProperty("--y", y);

    document.body.appendChild(part);

    setTimeout(() => part.remove(), 800);
  }

  setTimeout(() => {
    secret.style.display = "none";
    document.getElementById("app").style.display = "flex";
  }, 500);
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

/* ❤️ фон сердечки */
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