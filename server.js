import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {
  const { answer, date, time, message } = req.body;

  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text:
`Новый ответ ❤️

Ответ: ${answer}
Дата: ${date}
Время: ${time}
Сообщение: ${message}`
      })
    }
  );

  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);