

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
let idUser;




























































const contextMenu = document.getElementById('context-menu');
let readMes = JSON.parse(localStorage.getItem('NoReadMes')) || [];
let USERSinCHAT = [];
let usersAd =[];
let usersAdTo =[];

let selectedChatUsername = "";
lastCount = 0;
let chatsi = [];
// Запускаем этот движок при загрузке страницы
AutoUpdate();
AutoUpdateGetOtMes();
document.querySelector('.profil').textContent = user[0];




let NowOfLenUs = 0;


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


async function AutoUpdateGetOtMes() {
 await GetOthersMes();
    

    setTimeout(AutoUpdateGetOtMes, 5000);
}









function PoiskChat(){
    let h = 0;
    document.getElementById('erOfPoisk').style.display = 'none';
   
    texInp = document.getElementById('poisk').value;
    texInp = texInp.trim();
    all = document.querySelectorAll('.chat')
 
    all.forEach(i =>{
        let name = i.textContent;
        let usname = i.dataset.username;
        if(name.toLowerCase().includes(texInp.toLowerCase()) || usname.toLowerCase().includes(texInp.toLowerCase())){
            i.style.display = "block";
            h++;
        }
        else{
            i.style.display = "none";
        }
 
    });
    if(h === 0){
        document.getElementById('erOfPoisk').style.display = 'block';
    }
    else{
        document.getElementById('erOfPoisk').style.display = 'none';
    }
}

function playSound() {
   


    document.addEventListener('visibilitychange', () => {
       /*  if (document.visibilityState === 'visible') 
            { // страница видима 
            // 
            // 
            } 
            else { 
                const notifySound = new Audio('/home.app/tg.mp3');
                notifySound.play();

            } */
           
            if (document.hidden){
                const notifySound = new Audio('/home.app/tg.mp3');
                notifySound.play();

            } else {
                console.log('Вкладка активна');    
            }
            
            
            });
           
           

    // Проверяем, скрыта ли вкладка в данный момент
  //  if (document.hidden) {
     
  ///  }
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
        document.getElementById("info-user-avatar").textContent= data.username[0];
     
        
      
        
    
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
    getUserInfo();
}

async function ObnowInfoOfUser() {
    
    let userr = document.getElementById('newUsNa').value;
   let em = document.getElementById('newEmail').value;
    let passw = document.getElementById("newPasUs").value;

    if(passw.length < 6){
        return;
    }

    if(passw.length > 30){
        return;
    }

    if(userr.length > 10){
        return;
    }

    const response = await fetch('/api/EditInfoUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: idUser,
            usernameNow: userr,
            newEmail: em,
            newpassword: passw
          
         })
    });
    
    const data = await response.json();
    if(data.m === "D"){
        user = userr;
        zakrNast();

    }
    else if(data.m === "no"){
      
        return;
    }
    else{
        
        return;
    }
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
   
    const data = await response.json();
if(data.message === "er us"){

}
else{
    zakrCrCH(); 
}
    console.log("ОДА");
}























//////////////////////////////////////////////////
    //   ДОБАВЛЕНИЕ В ЧАТ КОТОРЫЙ УЖЕ ЕСТЬ
//////////////////////////////////////////////////


function OnAddUs(){
    document.querySelector('.modal-add-to-user').style.display = "block";



    AddUsersTo12345();



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

async function ToObnovUsersChat() {
    if(NowOfLenUs === usersAdTo.length){
        return;
    }
let chatA =  document.querySelector('.chat.active');
if(!chatA){
    return;
   }
   let chat = chatA.dataset.username;
   const response = await fetch('/api/EditChatUsers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat:chat,
            newusers: usersAdTo,
            
        })
    });
    
    const data = await response.json();
    zakrAus();
    openInfoChat();
}


















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
function MesOt(mes,username,time,id){
    let p = document.createElement('p');
    let dd = document.createElement('div');
    p.textContent = mes;
    p.classList.add('oth');
    p.dataset.id = id;
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
            let badge = document.createElement('span');
            badge.textContent = "";
            badge.classList.add('unread-badge');
            badge.style.display= "none";
            div.appendChild(badge);
            
            // Если мы нажали на этот чат ранее, сохраняем ему "активность"
            if (username === selectedChatUsername) {
                div.classList.add('active');
            }

            // Вешаем клик
            div.addEventListener('click', function() {
                selectedChatUsername = this.dataset.username;
        
                // Убираем активный класс у всех
                document.querySelectorAll('.chat').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
        
                // ГЛАВНОЕ: находим бейдж внутри этого чата и удаляем текст
                const currentBadge = this.querySelector('.unread-badge');
                if (currentBadge) {
                    currentBadge.textContent = ""; // Делаем текст пустым
                    currentBadge.style.display= "none";
                }
                
                lastCount = -1;
              
                GetMes();
                GetOthersMes();
            });

           // Проверяем, есть ли уже этот чат в нашем списке прочитанных
let YES= readMes.find(m => m.chat === username);

if (!YES) {
    // Добавляем только если его еще нет
    readMes.push({
        chat: username,
        id: ""
    });
    localStorage.setItem('NoReadMes', JSON.stringify(readMes));
}
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
   document.querySelector('.unread-badge')
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
// Если количество сообщений совпадает с тем, что было раньше
if (data.length === lastCount) {
    
    // Создаем флаг (переменную-индикатор) - нужно ли обновление?
    let needsUpdate = false;
    
    // Проходим по всем сообщениям с сервера
    for(let i = 0; i < data.length; i++) {
        
        // Ищем такое же сообщение в DOM по его ID
        let msgInDom = document.querySelector(`[data-id="${data[i].id}"]`);
        
        // Если нашли сообщение И его текст отличается от серверного
        if (msgInDom && msgInDom.textContent !== data[i].text) {
            needsUpdate = true;  // Отмечаем, что нужно обновить
            break;               // Выходим из цикла (дальше не ищем)
        }
    }
    
    // Если ничего не изменилось - выходим из функции
    if (!needsUpdate) {
        return;
    }
    
    // Если needsUpdate = true - код идет дальше и обновляет сообщения
}
   
  
   
    
    div.innerHTML = '';
    lastCount = data.length; // Запоминаем новое количество
    //div.innerHTML = '';
   
    for(let i = 0; i < data.length; i++){
            let id = data[i].id;
            let text = data[i].text;
            let username = data[i].usern;
            let tim = data[i].time;
            console.log("ЖОПА");
            let p = document.createElement('p');
            p.textContent = text;
            p.classList.add('soob');
          ///////////////////////////////////////////////////// 
        let am = readMes.find(m => m.chat === chat)
        am.id = id;
        localStorage.setItem('NoReadMes',JSON.stringify(readMes) ) 
        if(username == user){
            p.dataset.id = id;
            let t = document.createElement('div');
            t.textContent = tim;
            t.classList.add('message-time');
            p.classList.add('me');
            div.appendChild(p);
            div.appendChild(t);
        }
         else{
            MesOt(text , username,tim,id);
         }


            
        }
    }
   //скролд вниз
    scrollToBottom();
}






async function GetOthersMes(){
    
    let activeChat = document.querySelector('.chat.active');

    if (activeChat) {
  
        chat = activeChat.dataset.username;
    } else {
        // Если activeChat пустая (null или undefined, чат не выбран)
        chat = null;
    }
    
    let ggg =  localStorage.getItem('NoReadMes' ) 
    if(!ggg){
        ggg=[];
    
    }
    else{
        ggg = JSON.parse(ggg)
    }
    let chatsis = chatsi.filter(m => m !== chat);
    let rrr = ggg.filter(m => m.chat !== chat)
   if(chatsis.length === 0){
    return;
   }
    const response = await fetch('/api/hhhh/getMesOtherChats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            chati: chatsis,
            username: user,
            lastMes: rrr
        })
    });
    
    const data = await response.json();

    if(response.ok){
        // Вместо того чтобы искать каждый чат по отдельности, 
// мы проходим по всем кнопкам чатов, которые УЖЕ есть на экране
const all = document.querySelectorAll('.chat');

all.forEach(div => {
    const chatName = div.dataset.username; // Берем имя чата
    const count = data[chatName]; // 
    const badge = div.querySelector('.unread-badge');

    if (badge) {
        if (count > 0) {
          
         playSound();
               
          
          
            if( count > 99){
                badge.textContent =  "99+" ; // Если больше 99, пишем 99+
            }
           else{
            badge.textContent =  count ; // Если меньньше 99, пишем count
           }
           
            badge.style.display = "block";
      
        } else {
            badge.style.display = "none";
        }
    }
});








    }











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
   
        idUser = data.id;
        document.getElementById('newUsNa').value = data.username;
        document.getElementById('newEmail').value = data.email;
        document.getElementById("newPasUs").value = data.password;
   
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
    USERSinCHAT=[];
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
            USERSinCHAT.push(data.users[i]);
             
        }
       
    
    }
    else{
        return;
    }
}

function AddUsersTo12345() {

    let vseUse = document.getElementById('vseUse2'); // Контейнер для списка
    vseUse.innerHTML = ""; // Очищаем визуальный список
    usersAdTo = [];
   
    for(let i = 0; i<USERSinCHAT.length;i++){

// Создаем элемент "тег" для пользователя
let userTag = document.createElement('span');
userTag.className = 'user-tag'; // Добавляем класс для стилей
// Внутри функции AddUsers:
userTag.innerHTML = USERSinCHAT[i];
usersAdTo.push(USERSinCHAT[i]);
// Добавляем в контейнер
vseUse.appendChild(userTag);
    }
    NowOfLenUs = usersAdTo.length;
   
    
}




function EditMessage() {
    let id = contextMenu.dataset.selectedId || contextMenu.dataset.id;
    document.querySelector('.modal-edit-message').style.display = 'block';
    let p = document.querySelector(`[data-id="${id}"]`);
    document.getElementById('edit-message-text').value = p.textContent;
}
async function EditMessageM() {
    let id = contextMenu.dataset.selectedId || contextMenu.dataset.id;
    let p = document.querySelector(`[data-id="${id}"]`).textContent;
    
    let activeChat = document.querySelector('.chat.active');

    if(!activeChat){
     return;
    }
    
    let chat = activeChat.dataset.username;
    let ff =  document.getElementById('edit-message-text').value
    let newtext = ff.trim();
    if(newtext === ""){
return;
    }
    const response = await fetch('/api/EditMes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            chat: chat,  
            username: user,
            id: Number(id),
            text: p,
            newtext: newtext
        
        })
    });

    const data = await response.json();
    if(data.m === "D") {
        // Сразу обновляем текст в DOM
        p.textContent = newtext;
        
        // Закрываем модалку
        zakrEditModal();
        
        // Обновляем с сервера для синхронизации
        lastCount = -1;
        GetMes();
    }

}
function zakrEditModal(){
    document.querySelector('.modal-edit-message').style.display = 'none';
}



async function DeleteMessage() {
    let id = contextMenu.dataset.selectedId || contextMenu.dataset.id;
    /*if(!id){
        return;
    }*/
   
    
    const response = await fetch('/api/DelMes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  username: user,
            id: Number(id)
        })
    });
    
    const data = await response.json();
    if(data.m === "D") {
        console.log("Сообщение удалено на сервере");
      
        GetMes();// Сбрасываем счетчик, чтобы AutoUpdate увидел изменения
    }




}


async function CopyMessage() {
    let id = contextMenu.dataset.selectedId || contextMenu.dataset.id;
    /*if(!id){
        return;
    }*/
   
    let soob = document.querySelector(`[data-id="${id}"]`).textContent;
    
    navigator.clipboard.writeText(soob);


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



/*// Добавляем обработчик события нажатия контекстного меню
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
   //tovar.style.display = "none";
   return false;
});
*/

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





//
//           КОНТЕКСТНОЕ МЕНЮ
//


// Слушаем ПКМ на всём контейнере сообщений
// Слушаем ПКМ на всём контейнере сообщений
document.querySelector('.messages').addEventListener('contextmenu', function(e) {
    // Ищем элемент сообщения (p с классами me или oth)
    const msg = e.target.closest('p');
    
    if (msg && (msg.classList.contains('me') || msg.classList.contains('oth'))) {
        e.preventDefault(); // Запрещаем стандартное меню

        // Получаем автора сообщения
        // Ищем username перед сообщением
        let usernameElement = msg.previousElementSibling;
        let messageAuthor = '';
        
        if (usernameElement && usernameElement.classList.contains('username-chat')) {
            messageAuthor = usernameElement.textContent;
        } else {
            // Если это наше сообщение (me), то автор - текущий пользователь
            messageAuthor = user;
        }
        
        console.log("Автор сообщения:", messageAuthor);
        console.log("Текущий пользователь:", user);
        
        // Очищаем меню
        contextMenu.innerHTML = '';
        
        // Добавляем пункт "Удалить" для ВСЕХ сообщений
        let deleteItem = document.createElement('div');
        deleteItem.className = 'menu-item delete';
        deleteItem.textContent = 'Удалить';
        deleteItem.onclick = function() {
            DeleteMessage();
        };
        contextMenu.appendChild(deleteItem);
        
        // Добавляем пункт "Копировать" для ВСЕХ сообщений
        let copyitem = document.createElement('div');
        copyitem .className = 'menu-item';
        copyitem .textContent = 'Копировать';
        copyitem .onclick = function() {
            CopyMessage();
        };
        contextMenu.appendChild(copyitem);






        // Добавляем пункт "Редактировать" ТОЛЬКО для своих сообщений
        
        
        if (messageAuthor === user) {
            let editItem = document.createElement('div');
            editItem.className = 'menu-item';
            editItem.textContent = 'Редактировать';
            editItem.onclick = function() {
                EditMessage();
            };
            contextMenu.appendChild(editItem);
        }
        
        // Показываем меню
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.clientX - 150 + 'px';
        contextMenu.style.top = e.clientY + 'px';

        // Сохраняем ID сообщения
        const messageId = msg.dataset.id;
        contextMenu.dataset.selectedId = messageId;
        contextMenu.dataset.id = messageId;
        
        console.log("Выбрано сообщение с ID:", messageId);
    } else {
        // Если клик не по сообщению, скрываем меню
        contextMenu.style.display = 'none';
    }
});

// Закрываем меню при клике в любом месте
document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});



document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
   //tovar.style.display = "none";
   return false;
});