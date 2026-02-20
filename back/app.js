const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Делаем всю папку front доступной для сервера
// Теперь любой файл внутри front можно достать по его пути
app.use(express.static(path.join(__dirname, '../front')));



let mese =[
    {
        text: "привет!",
        usern: "admin",
        chat: "chat 1"
    },
    {
        text: "о привет!",
        usern: "жопа",
        chat: "chat 1"
    }


];










// Маршрут для главной (Start.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/startHtml/Start.html'));
});

// Маршрут для чата (home.html)
app.get('/mes', function(req, res){
    res.sendFile(path.join(__dirname, '../front/home.app/home.html'));
});
app.get('/reg', function(req, res){
    res.sendFile(path.join(__dirname, '../front/reg.app/reg.html'));
});
app.get('/voi', function(req, res){
    res.sendFile(path.join(__dirname, '../front/reg.app/vx.html'));
});





//post запросы
app.post('/api/register', function(req, res){
    res.json({ message: "Успешная регистрация" }); // Отправляем JSON
});

app.post('/api/vxod', function(req, res){
    res.json({ message: "Успешный вход" }); // Отправляем JSON
});
app.post('/api/sendMes', function(req, res){
   const {text, username, chat} = req.body;
   const newM= {
    text: text,
    usern:username,
    chat: chat
   }
   mese.push(newM);
  
    res.json({ message: "Успешнj" }); // Отправляем JSON
   console.log("да");
   console.log(mese);
});
app.post('/api/getMes', function(req, res){
   const  chat = req.body;
   
   
   
   
   // Создаем новый массив только с нужными сообщениями
    let CurentChatMessages = [];

for (let i = 0; i < mese.length; i++) {
    if (mese[i].chat == chat) {
        CurentChatMessages.push(mese[i]);
    }
};   
if(CurentChatMessages.length ==0)  {
    res.json({message: "Eror"})
}
else{
    res.json(CurentChatMessages);
    console.log("huy");
}

   
   
   
   
   
   
   
   
   
   // res.json({ message: "Успешный вход" }); // Отправляем JSON
});



app.listen(port);