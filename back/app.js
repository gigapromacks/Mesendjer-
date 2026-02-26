const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Делаем всю папку front доступной для сервера
// Теперь любой файл внутри front можно достать по его пути
app.use(express.static(path.join(__dirname, '../front')));


let chati = [
    {
       name: "АДМИНЫ",
        username: "Admins",
       users: ["жопа","Admin"]
    }
];
let users = [
    {
       
        username: "Admin",
        
       password: "123456",
       email: "d"
    
    },
    {
       
        username: "Jopa",
        
       password: "ExPu123",
       email: "rainbowcubot38@gmail.com"
    
    },
    {
       
        username: "1",
        
       password: "Userpass0",
       email: "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
    
    }


];

let mese =[
    {
        text: "привет!",
        usern: "admin",
        chat: "ЧАТ 1",
        time: "12:03"
    },
    {
        text: "о привет!",
        usern: "жопа",
        chat: "chat 2",
    time: "12:03"
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
    const {username,email,password} = req.body
   let boo = true;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            res.json({ message: "такой username уже есть" });
            boo = false;
        }
    };   
    if(boo){
        let newU ={
            username: username,
            email: email,
            password: password
        };
        users.push(newU);
        console.log(users);
        res.json({ message: "Успешная регистрация" });
   
    }
   
    // Отправляем JSON
});

app.post('/api/vxod', function(req, res){
    const {username,password} = req.body
    let f = users.find(m => m.username ===username && m.password === password);
    if(f){
        res.json({m:"d"});
    }
    else{
        res.json({m:"er"});
    }
   
   
   
    
});
app.post('/api/sendMes', function(req, res){
   const {text, username, chat,time} = req.body;
   const newM= {
    text: text,
    usern:username,
    chat: chat,
    time: time
    
}
   mese.push(newM);
  
    res.json({ message: "Успешнj" }); // Отправляем JSON
   console.log("да");
   console.log(mese);
});
app.post('/api/getMes', function(req, res){
   const  {chat} = req.body;
   
   
   
   
   // Создаем новый массив только с нужными сообщениями
    let CurentChatMessages = [];

for (let i = 0; i < mese.length; i++) {
    if (mese[i].chat === chat) {
        CurentChatMessages.push(mese[i]);
    }
};   
if(CurentChatMessages.length ==0)  {
    res.json([])
}
else{
    res.json(CurentChatMessages);
    console.log("huy");
}

   
   
   
   
   
   
   
   
   
   // res.json({ message: "Успешный вход" }); // Отправляем JSON
});


app.post('/api/CreateChat', function(req, res){
    const {name,username,usernames} = req.body
    console.log("Данные получены:", name, username);
    console.log("USer", usernames);
    let boo = true;
    for (let i = 0; i < chati.length; i++) {
        if (chati[i].username === username) {
            res.json({ message: "er us" });
            boo = false;
        }
    };   
    if(boo){
        let newU ={
            name: name,
            username: username,
            users: usernames,
        };
        chati.push(newU);
        console.log(users);
        res.json({ message: "Успешна" });
   
    }
   
 
});

app.post('/api/Ichat', function(req, res){
    const {username} = req.body
    let boo = true;
    console.log("Данные получены:", username);






// Ищем все чаты, где в массиве users есть наш пользователь
let userChats = chati.filter(c => c.users.includes(username));

if(userChats.length > 0) {
    res.json(userChats); // Отправляем массив найденных чатов
} else {
    res.json({ message: "no" });
}







    /*
    for (let i = 0; i < chati.length; i++) {
        if (chati[i].username === username) {
            res.json(chati[i]);
            boo = false;
            return;
        }
    };   
    if(boo){
       
       
    }
   
   */
});


app.post('/api/getUserInfo', function(req, res){
    const {username} = req.body
    let boo = true;
    for(let i = 0; i < users.length; i++){
        if(users[i].username === username){
       
            res.json(users[i]);
            boo = false;
            return;
        }
    }
    if(boo){
        res.json({ message: "no"});
    }
});



app.post('/api/getInfoChat', function(req, res){
    const {chat} = req.body;
    console.log(chat);
    let bob = true;
    //   res.json({ message: "Успешнj" }); // Отправляем JSON
   for(let i = 0; i <chati.length; i++){
    if(chati[i].username === chat){
        bob = false;
        res.json(chati[i]);
        return;
    }
   }
 if(bob){
    res.json({ message: "no" });
 }
 });


 
 app.post('/api/GetOtUserInfo', function(req, res) {
    const { usernameI, usernameY } = req.body;

    // 1. Быстрый поиск целевого пользователя
    const targetUser = users.find(u => u.username === usernameY);

    if (!targetUser) {
        return res.json({ mes: "no" });
    }

    // 2. Поиск общих чатов через фильтрацию
    // Проверяем каждый чат: есть ли в массиве users ОБА пользователя
    const commonChats = chati.filter(chat => 
        chat.users.includes(usernameI) && chat.users.includes(usernameY)
    );

    // 3. Формируем и отправляем ответ
    res.json({
        username: targetUser.username,
        email: targetUser.email,
        chatCount: commonChats.length
    });
});




app.post('/api/EditChatUsers', function(req, res){
    const {chat,newusers} = req.body
    let mmm = chati.find(m => m.username === chat);
    mmm.users = newusers;// mmm = newusers;
    res.json({m:"d"});
});




app.post('/api/EditMes', function(req, res){
    const {chat,newusers} = req.body
    let mmm = chati.find(m => m.username === chat);
    mmm = newusers;
});

app.listen(port);
