const  user  = localStorage.getItem('user'); 

console.log(user);
if(user){
console.log("да")
PROVERKA();
}
else{
    console.log("нет")
    window.location.href = '/reg';
}






























































let usersAd =[];
let usersAdTo =[];

let selectedChatUsername = "";
lastCount = 0;
let chatsi = [];
// Запускаем этот движок при загрузке страницы
AutoUpdate();

document.querySelector('.profil').textContent = user[0];







//
//
//        ФУНКЦИИ
//
//




async function PROVERKA() {
    const response = await fetch('/api/getUserInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            username: user
       
        })
    });
    
    const data = await response.json();
    if(data.message === "no"){
        localStorage.removeItem('user');
        console.log("нет")
        window.location.href = '/reg';
    
    }





}






async function AutoUpdate() {
    await GetChat(); // Обновили список чатов
    await GetMes();  // Обновили сообщения внутри выбранного
    
    // Запускаем круг заново через 2 секунды
    setTimeout(AutoUpdate, 2000);
}







//
// модалки
//
async function modakInfoUser(){
    document.querySelector('.modal-info-user').style.display = "block"
    let activeMes = document.querySelector('.username-chat.activeM');

    if(!activeMes){
     return;
    }
     let usernameYY = activeMes.textContent;




    const response = await fetch('/api/GetOtUserInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            usernameI: user  ,
            usernameY: usernameYY
         })
    });
    
    const data = await response.json();
    console.log("Данные пользователя:", data);
    
    // Заполняем модалку данными
    if(data.mes !== "no") {
        document.getElementById('info-user-name').textContent = data.username;
        document.getElementById('info-user-email').textContent = data.email;
        document.getElementById('info-user-chats').textContent = data.chatCount;
    }





}
function ZakrmodakInfoUser(){
    document.querySelector('.modal-info-user').style.display = "none"
}
function OtProfil(){
    document.querySelector('.modal-profil').style.display = 'block';
    getUserInfo();
}
function zakrProfil(){
    document.querySelector('.modal-profil').style.display = 'none';

}
function nastroyki(){
    document.querySelector('.modal-nast').style.display = 'block';

}
function zakrNast(){
    document.querySelector('.modal-nast').style.display = 'none';

}















//скрол вниз
function scrollToBottom() {
    let messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function getCurrentTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}

// Использование:
console.log(getCurrentTime()); // "14:35"




















//
// СОзданние чатов
//
function PokazModalCrCh(){
  usersAd = [];

    document.querySelector('.modal-createChat').style.display = "block";
   vseude = document.getElementById('vseUse');
    let userTag = document.createElement('span');
    userTag.className = 'user-tag'; // Добавляем класс для стилей
    // Внутри функции AddUsers:
userTag.innerHTML = user;
   vseude.appendChild(userTag); 
   usersAd.push(user);


}

function AddUsers() {
    let input = document.getElementById('UseCh'); // Поле ввода
    let us = input.value.trim();                  // Текст из поля (без пробелов)
    let vseUse = document.getElementById('vseUse'); // Контейнер для списка

    if (us === "") return; // Если в поле пусто, ничего не делаем
    for(let i =0; i<usersAd.length;i++){
        if(usersAd[i]== us){
            return;
        }
    }
    // Создаем элемент "тег" для пользователя
    let userTag = document.createElement('span');
    userTag.className = 'user-tag'; // Добавляем класс для стилей
    // Внутри функции AddUsers:
userTag.innerHTML = `${us} <b onclick="deleteUser('${us}', this)" style="cursor:pointer; margin-left:5px; color:#ff4d4d">×</b>`;
    usersAd.push(us);
    // Добавляем в контейнер
    vseUse.appendChild(userTag);
    console.log(usersAd);
    // Очищаем поле ввода для следующего имени
    input.value = "";
    console.log(vseUse.textContent);
}





//ХЗ ЧТО ЗДЕСЬ
/////////////////////////////////////////
///////////////////////////////////////////
function deleteUser(nameToDelete, element) {
    // 1. Удаляем из массива данных
    // Оставляем в массиве только тех, чье имя НЕ совпадает с удаляемым
    usersAd = usersAd.filter(username => username !== nameToDelete);

    // 2. Удаляем элемент из HTML (удаляем тег span)
    element.parentElement.remove();

    console.log("Юзер удален:", nameToDelete);
    console.log("Остались в массиве:", usersAd);
}
//////////////////////////////////////////
///////////////////////////////////





function zakrCrCH(){
    document.querySelector('.modal-createChat').style.display = "none";
     document.getElementById('nameChat').value = "";
 document.getElementById('nameUserName').value = "";
    document.getElementById('vseUse').textContent = "";
    usersAd =[];



}

async function crCh(){
  let nam = document.getElementById('nameChat').value;
  let usernam = document.getElementById('nameUserName').value;
    let name = nam.trim();
    let username = usernam.trim();

    if(name == ""||username =="" || usersAd.length == 0){
   console.log("ДАДАДАД");
    return;
  }
  if(name.length > 15 ||username.length > 10 ){
    return;
  }

  const response = await fetch('/api/CreateChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:name,
            username: username,
            usernames: usersAd
       
        })
    });
    zakrCrCH();
    console.log("ОДА");
    const data = await response.json();
    console.log("ОДА");
}























//////////////////////////////////////////////////
    //   ДОБАВЛЕНИЕ В ЧАТ КОТОРЫЙ УЖЕ ЕСТЬ
//////////////////////////////////////////////////


function OnAddUs(){
    document.querySelector('.modal-add-to-user').style.display = "block";
}
function zakrAus(){
    document.querySelector('.modal-add-to-user').style.display = "none";        
        document.getElementById('UseCh2').value = "";
   document.getElementById('vseUse2').textContent = "";
   usersAdTo =[];
}














function AddUsersTo() {
    let input = document.getElementById('UseCh2'); // Поле ввода
    let us = input.value.trim();                  // Текст из поля (без пробелов)
    let vseUse = document.getElementById('vseUse2'); // Контейнер для списка

    if (us === "") return; // Если в поле пусто, ничего не делаем
    for(let i =0; i<usersAdTo.length;i++){
        if(usersAdTo[i]== us){
            return;
        }
    }
    // Создаем элемент "тег" для пользователя
    let userTag = document.createElement('span');
    userTag.className = 'user-tag'; // Добавляем класс для стилей
    // Внутри функции AddUsers:
userTag.innerHTML = `${us} <b onclick="TodeleteUser('${us}', this)" style="cursor:pointer; margin-left:5px; color:#ff4d4d">×</b>`;
    usersAdTo.push(us);
    // Добавляем в контейнер
    vseUse.appendChild(userTag);
    console.log(usersAdTo);
    // Очищаем поле ввода для следующего имени
    input.value = "";
    console.log(vseUse.textContent);
}


//ХЗ ЧТО ЗДЕСЬ
/////////////////////////////////////////
///////////////////////////////////////////
function TodeleteUser(nameToDelete, element) {
    // 1. Удаляем из массива данных
    // Оставляем в массиве только тех, чье имя НЕ совпадает с удаляемым
    usersAdTo = usersAdTo.filter(username => username !== nameToDelete);

    // 2. Удаляем элемент из HTML (удаляем тег span)
    element.parentElement.remove();

    console.log("Юзер удален:", nameToDelete);
    console.log("Остались в массиве:", usersAd);
}
//////////////////////////////////////////
///////////////////////////////////




















async function SendMes(){
    let inp = document.getElementById("Send").value;
    let p = document.createElement('p');
    p.textContent = inp.trim();
    p.classList.add('me');
   let chat = "";// для теста
    let div = document.querySelector('.messages');
    
  
    
    let activeChat = document.querySelector('.chat.active');
    chat = activeChat.dataset.username;
    let tiTime = getCurrentTime();
    let t = document.createElement('div');
    t.textContent = tiTime;
    t.classList.add('message-time');
   // t.classList.add('me');
  
  
  
    if(inp.trim() == "" || chat ==""){
        console.log("нет чата")
    }
    else{
       ////////////////////////////////
       ///////////////////////////////
        const response = await fetch('/api/sendMes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text:inp.trim(),
                username: user,
                chat: chat,
                time: tiTime
            })
        });
        
        const data = await response.json();
        
        
     //////////////////////////////////
     ///////////////////////////////////////
     
        div.appendChild(p);
        div.appendChild(t);
        //скрол вниз
        scrollToBottom();
        //p.value = "";
        document.getElementById("Send").value = "";
    }

}
function MesOt(mes,username,time){
    let p = document.createElement('p');
    let dd = document.createElement('div');
    p.textContent = mes;
    p.classList.add('oth');
    dd.textContent = username;
    dd.classList.add('username-chat');
    //dd.onclick = modakInfoUser;
    let div = document.querySelector('.messages');
    let t = document.createElement('div');
    t.textContent = time;
    t.classList.add('message-time');
    if(p.textContent == ""){

    }
    else{
        div.appendChild(dd)
        div.appendChild(p);
        div.appendChild(t);
        


        dd.addEventListener('click', function() {
            // Запоминаем имя выбранного чата
          //  selectedChatUsername = this.dataset.username;

            document.querySelectorAll('.username-chat').forEach(c => c.classList.remove('activeM'));
            this.classList.add('activeM');
            
            // ВОТ ЭТО СПАСЕТ ТВОЮ ЛОГИКУ:
//lastCount = -1;// Сброс для мгновенной загрузки сообщений
modakInfoUser();
        });



        //p.value = "";
       
    }
}
function delAk(){
    localStorage.removeItem('user');
    window.location.href = '/mes';
}
////////////////////////////////////////
// ПОЛУЧЕНИЕ
////////////////////////////////////
async function GetChat() {
    const response = await fetch('/api/Ichat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user })
    });
    
    const data = await response.json();

    if(data.messages === "no") return;

    if(response.ok) {
        let chatsOb = document.querySelector('.chats');
        
        for(let i = 0; i < data.length; i++) {
            let name = data[i].name;
            let username = data[i].username;
            
            // ПРОВЕРКА: Если такой username уже есть в массиве chatsi, 
            // просто пропускаем этот круг цикла (continue), а не выходим из функции (return)
            if (chatsi.includes(username)) {
                continue; 
            }

            // Если чата нет, добавляем его в массив и рисуем
            chatsi.push(username);
            
            let div = document.createElement('div');
            div.textContent = name;
            div.dataset.username = username;
            div.classList.add('chat');

            // Если мы нажали на этот чат ранее, сохраняем ему "активность"
            if (username === selectedChatUsername) {
                div.classList.add('active');
            }

            // Вешаем клик
            div.addEventListener('click', function() {
                // Запоминаем имя выбранного чата
                selectedChatUsername = this.dataset.username;

                document.querySelectorAll('.chat').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // ВОТ ЭТО СПАСЕТ ТВОЮ ЛОГИКУ:
    lastCount = -1;// Сброс для мгновенной загрузки сообщений
                GetMes();
            });

            chatsOb.appendChild(div);
        }
    }
}

async function GetMes(){
    
   
    let activeChat = document.querySelector('.chat.active');

   if(!activeChat){
    return;
   }
   let vse = document.querySelectorAll('.chats');
   let chat = "";
   chat = activeChat.dataset.username;
  document.querySelector('.title').textContent = activeChat.textContent;
   if(chat == ""){
        
        
    }
    else{
        let div = document.querySelector('.messages');
        
        const response = await fetch('/api/getMes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              //  username: user,
                chat: chat
           
            })
        });
        
        const data = await response.json();
      
      
      // Если количество сообщений не изменилось — ничего не делаем
    if (data.length === lastCount) return;
   
  
   
    
    div.innerHTML = '';
    lastCount = data.length; // Запоминаем новое количество
    //div.innerHTML = '';
   
    for(let i = 0; i < data.length; i++){
           
            let text = data[i].text;
            let username = data[i].usern;
            let tim = data[i].time;
            console.log("ЖОПА");
            let p = document.createElement('p');
            p.textContent = text;
            p.classList.add('soob');
           
            
         if(username == user){
            let t = document.createElement('div');
            t.textContent = tim;
            t.classList.add('message-time');
            p.classList.add('me');
            div.appendChild(p);
            div.appendChild(t);
        }
         else{
            MesOt(text , username,tim);
         }


            
        }
    }
   //скролд вниз
    scrollToBottom();
}


















async function getUserInfo() {
    const response = await fetch('/api/getUserInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            username: user
       
        })
    });
    
    const data = await response.json();
    if(data.message === "no"){
        return;

    }
    else if (response.ok){
        document.getElementById('profil-username').textContent = data.username;
        document.getElementById('profil-email').textContent = data.email;
         document.getElementById('profil-password').textContent = data.password;
        document.querySelector('.modal-profil-avatar').textContent = user[0];
        document.getElementById('profil-len').textContent = chatsi.length;
    }
    else{
        return;
    }
}










function zakrInfoChat(){
    document.querySelector('.Modal-info-chat').style.display = "none";
    document.querySelector('.modal-add-to-user').style.display = "none";
    document.getElementById("vseUse3").textContent="";

}
async function openInfoChat() {
   let chatA = document.querySelector('.chat.active');
   if(!chatA){
    return;
   }
   chat = chatA.dataset.username;
   document.querySelector('.Modal-info-chat').style.display = "block";
   
    const response = await fetch('/api/getInfoChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            chat: chat
        })
    });
    
    const data = await response.json();

    if(data.message === "no"){
        return;///////// ПОКА ЧТО
    }
    else if(response.ok){
        let container  = document.getElementById("vseUse3")
        container.innerHTML="";
        document.getElementById("info-chat-name").textContent= data.name;
        document.getElementById("info-chat-username").textContent= data.username;
        document.getElementById("info-chat-members").textContent= data.users.length;
        
        for(let i= 0; i<data.users.length;  i++){
            container.innerHTML += "• " + data.users[i] + "<br>";
           
             
        }
       
    
    }
    else{
        return;
    }
}












//
//
//        ОБРАБОТЧИКИ
//
//


// Добавляем обработчик события нажатия клавиш
document.getElementById("Send").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        SendMes();
    }
});



// Добавляем обработчик события нажатия контекстного меню
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
   //tovar.style.display = "none";
   return false;
});


// Добавляем обработчик события нажатия на чаи
// Добавляем обработчик события нажатия на чаты
document.addEventListener('DOMContentLoaded', function() {
    const chats = document.querySelectorAll('.chat'); // все чаты
    
    chats.forEach(chat => {
        chat.addEventListener('click', function() {
            // Убираем активный класс у всех чатов
            chats.forEach(c => c.classList.remove('active'));
            // Добавляем текущему
            this.classList.add('active');
           // ВОТ ЭТО СПАСЕТ ТВОЮ ЛОГИКУ:
    lastCount = -1; // Сбрасываем счетчик, чтобы сообщения нового чата точно отрисовались
            GetMes();
            GetChat();
        });
    });
});