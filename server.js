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
<title>💖</title>

<style>

body{
 margin:0;
 font-family:Arial;
 color:white;
 overflow:hidden;

 /* ВАЖНО: сразу ставим фон */
 background: linear-gradient(135deg,#3b0a1a,#1a0a0f);
 transition: background 0.7s ease;
}

/* экраны */
.screen{
 position:fixed;
 width:100%;
 height:100vh;
 display:none;
 justify-content:center;
 align-items:center;
 text-align:center;
 padding:20px;
}
.active{display:flex;}

/* текст */
.text{font-size:22px;}

/* кнопки */
button{
 margin:8px;
 padding:12px 20px;
 border:none;
 border-radius:12px;
 font-size:16px;
 position:relative;
 z-index:10;
}

#yes{background:#22c55e;}

#love{
 background:#ff006e;
 color:white;
 animation:pulse 1.2s infinite;
}

#no{
 background:#ef4444;
 position:absolute;
 width:120px;
}

@keyframes pulse{
 50%{transform:scale(1.1);}
}

/* фото */
.photo{
 width:200px;
 border-radius:20px;
 opacity:0;
 transform:scale(0.9);
 transition:0.6s;
}
.show{
 opacity:1;
 transform:scale(1);
}

/* уведомление */
#notif{
 position:fixed;
 top:20px;
 left:50%;
 transform:translateX(-50%) translateY(-120px);
 background:rgba(0,0,0,0.8);
 padding:12px;
 border-radius:20px;
 width:85%;
 text-align:center;
 transition:0.4s;
}

/* финал */
.final{
 flex-direction:column;
}
.final h1{
 font-size:30px;
 animation:pulse 1.5s infinite;
}

/* сердечки */
.heart{
 position:absolute;
 animation:float 5s linear forwards;
}
@keyframes float{
 from{transform:translateY(100vh);}
 to{transform:translateY(-10vh);opacity:0;}
}

</style>
</head>

<body>

<div id="notif">💬 Я тебя тоже ❤️</div>

<div class="screen active">
 <div class="text">💌 Крис… нажми куда угодно</div>
</div>

<div class="screen"><div class="text" id="t1"></div></div>
<div class="screen"><div class="text" id="t2"></div></div>

<div class="screen">
 <img src="${IMAGE_URL}" class="photo" id="photo">
</div>

<div class="screen"><div class="text" id="t3"></div></div>

<div class="screen">
 <div>
  <div class="text">Крис, ты придёшь? 😳</div>
  <input type="date" id="date"><br>
  <input type="time" id="time"><br>

  <button id="yes" onclick="yes()">Да 💖</button>
  <button id="love" onclick="love()">Я тебя люблю ❤️</button>
  <button id="no" onmouseover="move()">Нет 😢</button>
 </div>
</div>

<div class="screen final">
 <h1>💘 Крис, я буду ждать тебя 💘</h1>
 <p>мне правда хочется провести этот день с тобой</p>
</div>

<script>

let current=0;
let screens=document.querySelectorAll(".screen");

/* 💖 ГАРАНТИРОВАННЫЕ ФОНЫ */
let backgrounds = [
 "linear-gradient(135deg,#3b0a1a,#1a0a0f)",
 "linear-gradient(135deg,#5a0f2a,#2a0f17)",
 "linear-gradient(135deg,#7a143a,#3a1420)",
 "linear-gradient(135deg,#a61e4d,#4d1e2e)",
 "linear-gradient(135deg,#d6336c,#6b2b45)",
 "linear-gradient(135deg,#ff4d8d,#8a3a5c)",
 "linear-gradient(135deg,#ff80ab,#b84d73)"
];

/* сразу ставим фон */
document.body.style.background = backgrounds[0];

/* смена */
function updateBackground(){
 if(backgrounds[current]){
  document.body.style.background = backgrounds[current];
 }
}

/* клик */
document.body.addEventListener("click",(e)=>{
 if(e.target.tagName==="BUTTON") return;
 if(current===screens.length-1) return;
 if(current===5) return;

 next();
});

function next(){
 screens[current].classList.remove("active");
 current++;
 screens[current].classList.add("active");

 updateBackground();
 onScreen();
 vibrate();
}

function vibrate(){
 if(navigator.vibrate) navigator.vibrate(60);
}

/* печатание */
function type(el,text){
 let i=0;
 el.innerHTML="";
 let int=setInterval(()=>{
  el.innerHTML+=text[i];
  i++;
  if(i>=text.length) clearInterval(int);
 },35);
}

/* логика */
function onScreen(){

 if(current===1){
  type(t1,"Крис… я давно хотел тебе кое-что сказать…");
 }

 if(current===2){
  type(t2,"ты правда стала для меня особенной 💖");
 }

 if(current===3){
  setTimeout(()=>photo.classList.add("show"),200);
 }

 if(current===4){
  type(t3,"мне очень нравится проводить с тобой время… с тобой спокойно");
 }
}

/* люблю */
function love(){
 vibrate();
 showNotif();

 for(let i=0;i<15;i++){
  let h=document.createElement("div");
  h.className="heart";
  h.innerHTML="❤️";
  h.style.left=Math.random()*100+"vw";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),1000);
 }
}

/* уведомление */
function showNotif(){
 let n=document.getElementById("notif");
 n.style.transform="translateX(-50%) translateY(0)";
 setTimeout(()=>{
  n.style.transform="translateX(-50%) translateY(-120px)";
 },2000);
}

/* нет */
function move(){
 let b=document.getElementById("no");
 b.style.left=Math.random()*(window.innerWidth-100)+"px";
 b.style.top=Math.random()*(window.innerHeight-50)+"px";
}

/* да */
function yes(){
 let d=document.getElementById("date").value;
 let t=document.getElementById("time").value;

 if(!d||!t){
  alert("выбери дату 💖");
  return;
 }

 fetch("/yes?date="+d+"&time="+t);

 screens[current].classList.remove("active");
 current++;
 screens[current].classList.add("active");
}

/* сердечки */
setInterval(()=>{
 let h=document.createElement("div");
 h.className="heart";
 h.innerHTML="❤️";
 h.style.left=Math.random()*100+"vw";
 document.body.appendChild(h);
 setTimeout(()=>h.remove(),5000);
},400);

</script>

</body>
</html>
`);
});

/* telegram */
app.get("/yes", async (req,res)=>{
 try{
  const text="💘 Крис согласилась!\\n📅 "+req.query.date+"\\n⏰ "+req.query.time;

  await fetch("https://api.telegram.org/bot"+TOKEN+
  "/sendMessage?chat_id="+CHAT_ID+"&text="+encodeURIComponent(text));

  res.send("ok");
 }catch(e){
  console.log(e);
  res.send("error");
 }
});

app.listen(process.env.PORT||3000);