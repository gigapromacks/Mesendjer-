const express = require('express');
const path = require('path');
//const fs = require('fs'); // <--- ДОБАВЬ ЭТУ СТРОКУ!
const multer = require("multer");
const cors = require('cors'); // <--- ДОБАВЬ ЭТУ СТРОКУ!

const app = express();
const port = 5000;


app.use(cors());
const upload = multer({dest: "uploads"}); // ← папка "uploads"
app.use('/uploads', express.static('uploads'));


//app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Делаем всю папку front доступной для сервера
// Теперь любой файл внутри front можно достать по его пути
app.use(express.static(path.join(__dirname, '../front')));


/*
// Пути к файлам
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CHATS_FILE = path.join(DATA_DIR, 'chats.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Создаем папку data если её нет
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Функции загрузки/сохранения
function loadData() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            users = JSON.parse(fs.readFileSync(USERS_FILE));
        }
        if (fs.existsSync(CHATS_FILE)) {
            chati = JSON.parse(fs.readFileSync(CHATS_FILE));
        }
        if (fs.existsSync(MESSAGES_FILE)) {
            mese = JSON.parse(fs.readFileSync(MESSAGES_FILE));
        }
        console.log('✅ Данные загружены из файлов');
    } catch (err) {
        console.log('⚠️ Ошибка загрузки, использую начальные данные');
    }
}

function saveData() {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        fs.writeFileSync(CHATS_FILE, JSON.stringify(chati, null, 2));
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(mese, null, 2));
        console.log('💾 Данные сохранены');
    } catch (err) {
        console.log('❌ Ошибка сохранения:', err);
    }
}
    o0

*/


    let chati = [
        {
        name: "АДМИНЫ",
            username: "Admins",
        users: ["жопа","Admin","Jopa","1"],
        id: 1
        }
    ];
let users = [
    {
       
        username: "Admin",
        
       password: "123456",
       email: "d",
       id: 0
    },
    {
       
        username: "Jopa",
        
       password: "ExPu123",
       email: "rainbowcubot38@gmail.com",
       id: 1
    },
    {
       
        username: "1",
        
       password: "Userpass0",
       email: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
       id: 2
    
    }


];

let mese =[
    {
        text: "привет!",
        usern: "admin",
        usId:"11",
        chat: "ЧАТ 1",
        time: "12:03",
        id: 0
    }

];

let onlineUser = [];
let spamUser = [];;
//loadData();






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
       let id = Date.now();
        let newU ={
            username: username,
            email: email,
            password: password,
            id: id
        };
        users.push(newU);
        console.log(users);
        res.json({m:id});
   
    }
   // saveData();
    // Отправляем JSON
});

app.post('/api/vxod', function(req, res){
    const {username,password} = req.body
    let f = users.find(m => m.username ===username && m.password === password);
    if(f){
   // Отправляем всё в одном объекте
   res.json({
    m: "d", 
    id: f.id,
    username: f.username 
});
    }
    else{
        res.json({m:"er"});
    }
   
   
   // saveData();
    
});
app.post('/api/sendMes', function(req, res){
   const {text, username, chat,time,usId} = req.body;
   if(!text || !username || !chat || !time || !usId){
    return;
   }
   if (spamUser[usId]) {
    //s
    if (Date.now() - spamUser[usId] < 101) {
        return;
    }
}
    spamUser[usId] = Date.now();
   
   const newM= {
    text: text,
    usern:username,
    usId: usId,
    chat: chat,
    time: time,
    id: Date.now(),
    type: "text",
    file: "файла нету",
    fileName: "12", // ← ИМЯ ФАЙЛА
    fileSize: 1   
}
   mese.push(newM);
  
    res.json({ message: "Успешнj" }); // Отправляем JSON
   console.log("да");
   console.log(mese);
   //saveData();
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

   
   
   
   
   
   
   
   
//saveData();
   // res.json({ message: "Успешный вход" }); // Отправляем JSON
});



app.post('/api/sendFile', upload.single("file"), function(req, res){ // Поменяли "filedata" на "file"
    const { id, username, chat, time } = req.body;
    if( !username || !chat || !time || !username ){
        return;
       }
    // Защита: если файл не пришел, не даем серверу упасть
    if (!req.file) {
        return res.json({ message: "Ошибка загрузки файла" });
    }
    if (spamUser[id]) {
        //s
        if (Date.now() - spamUser[id] < 101) {
            return;
        }
    }
    
    let tipqw = req.file.mimetype;
    let tip = tipqw.split('/')[0];
    if (tip == "text" || tip == "application"){
        tip = "textfile"
    }
    console.log(tip);
   
    spamUser[id] = Date.now();
    
    const newM = {
        text: "файл", // Заглушка, так как текста у картинки нет
        usern: username,
        usId: id,
        chat: chat,
        time: time,
        id: Date.now(),
        type: tip,
        file: '/uploads/' + req.file.filename, // Правильно берем имя файла
        fileName: req.file.originalname, // ← ИМЯ ФАЙЛА
        fileSize: req.file.size   
    };
    console.log(req.file.originalname);
    mese.push(newM);
    res.json({ message: "Успешно" }); 
});










app.post('/api/hhhh/getMesOtherChats', function(req, res){
    const  {chati,username,lastMes} = req.body;
    let reu = {};
    chati.forEach(i => {
        let lastM = lastMes.find(m=>m.chat === i);
        let lastMId;
        if(!lastM){
            lastMId = 0;
        }
        else{
            lastMId = lastM.id;
        }
        
        let qwe = mese.filter(m => m.chat === i && m.usern !== username && Number(m.id) >  lastMId);

        // 3. Записываем количество в объект
        reu[i] = qwe.length;




    });
    
    
   
    
    
    
    
    
    
    
    console.log(reu)
     res.json(reu); // Отправляем JSON
    // saveData();
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
            id: Date.now()
        };
        chati.push(newU);
        console.log(users);
        res.json({ message: "Успешна" });
   
    }
   
    //saveData();
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
   
   */ //saveData();
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
  //  saveData();
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
 
 //saveData();
});


 
 app.post('/api/GetOtUserInfo', function(req, res) {
    const { usernameI, usernameY } = req.body;
    let isOnline = false;
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

    if (onlineUser[usernameY]) {
        // Проверяем: прошло ли меньше 10 секунд (10000 миллисекунд) с его последнего стука?
        if (Date.now() - onlineUser[usernameY] < 10000) {
            isOnline = true;
        }
    }


    // 3. Формируем и отправляем ответ
    res.json({
        username: targetUser.username,
        email: targetUser.email,
        chatCount: commonChats.length,
        isOnline: isOnline
    });

   // saveData();
});




app.post('/api/EditChatUsers', function(req, res){
    const {chat,newusers} = req.body
    let mmm = chati.find(m => m.username === chat);
    mmm.users = newusers;// mmm = newusers;
    res.json({m:"d"});
  //  saveData();
});




app.post('/api/EditMes', function(req, res){
    const {chat,username,id,text,newtext} = req.body;
    mm = mese.find(m => m.chat === chat && m.usern ===username && m.id === Number(id) && m.text === text)
    mm.text = newtext;
    res.json({m:"D"})
    //saveData();
});
app.post('/api/DelMes', function(req, res){
    const {id} = req.body
    
    mese = mese.filter(m => m.id !== Number(id))
    res.json({m:"D"})
    //saveData();
});



app.post('/api/EditInfoUser', function(req, res){
    const {id,newEmail,newpassword} = req.body;
    let nui = users.find(m => m.id === Number(id));
    
    // Проверяем, что все новые данные отличаются от старых?
    if(nui.email == newEmail && nui.password == newpassword){
    res.json({m:"no"}) // Если всё совпадает со старыми данными
    return;
   }
    
    
    
   // Правильно: обновляем свойства найденного объекта
   nui.email = newEmail;
   nui.password = newpassword;
    res.json({m:"D"})
    //saveData();
});


app.post('/api/chotoTam/ping', function(req, res){
    const {username} = req.body;
    if(username){
        onlineUser[username] = Date.now();
    }
    res.json({m:"да"})
});


app.listen(port);
