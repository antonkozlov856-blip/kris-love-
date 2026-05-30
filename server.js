const express = require("express");
const fetch = require("node-fetch"); // ✅ ВАЖНО
const app = express();

const TOKEN = "ТВОЙ_ТОКЕН";
const CHAT_ID = "ТВОЙ_CHAT_ID";

app.get("/", (req, res) => {
  res.send(`
  <html>
    <body style="background:#111;color:white;text-align:center;font-family:Arial;padding-top:100px;">

      <h1>Крис, пойдешь со мной на свидание? 💖</h1>

      <input type="date" id="date"><br><br>
      <input type="time" id="time"><br><br>

      <button onclick="yes()">Да 😍</button>
      <button id="no" onmouseover="move()" style="position:absolute;">Нет 😢</button>

      <script>
        function yes() {
          let d = document.getElementById("date").value;
          let t = document.getElementById("time").value;

          if (!d || !t) {
            alert("Выбери дату и время ❤️");
            return;
          }

          fetch('/yes?date=' + d + '&time=' + t);
          document.body.innerHTML = "<h1>❤️ Я буду ждать тебя ❤️</h1>";
        }

        function move() {
          let b = document.getElementById("no");
          b.style.left = Math.random()*300 + "px";
          b.style.top = Math.random()*300 + "px";
        }
      </script>

    </body>
  </html>
  `);
});

app.get("/yes", async (req, res) => {
  try {
    const text = encodeURIComponent(
      "💘 ОНА СОГЛАСИЛАСЬ!\\n📅 Дата: " + req.query.date + "\\n⏰ Время: " + req.query.time
    );

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);

    res.send("ok");
  } catch (e) {
    console.log(e);
    res.send("error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});