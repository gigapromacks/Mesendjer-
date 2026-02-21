let  user  = localStorage.getItem('user'); 

console.log(user);
if(user){
console.log("да")
}
else{
    console.log("нет")
    window.location.href = '/reg';
}
let usersAd =[];


let selectedChatUsername = "";
lastCount = 0;
let chatsi = [];
// Запускаем этот движок при загрузке страницы
AutoUpdate();









//
//
//        ФУНКЦИИ
//
//


async function AutoUpdate() {
    await GetChat(); // Обновили список чатов
    await GetMes();  // Обновили сообщения внутри выбранного
    
    // Запускаем круг заново через 2 секунды
    setTimeout(AutoUpdate, 2000);
}




















//скрол вниз
function scrollToBottom() {
    let messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


//
// СОзданние чатов
//
function PokazModalCrCh(){
    document.querySelector('.modal-createChat').style.display = "block";
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





async function SendMes(){
    let inp = document.getElementById("Send").value;
    let p = document.createElement('p');
    p.textContent = inp.trim();
    p.classList.add('me');
   let chat = "";// для теста
    let div = document.querySelector('.messages');
    
  
    
    let activeChat = document.querySelector('.chat.active');
    chat = activeChat.dataset.username;
  
  
  
  
  
  
  
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
                text:inp,
                username: user,
                chat: chat
           
            })
        });
        
        const data = await response.json();
        
        
     //////////////////////////////////
     ///////////////////////////////////////
     
        div.appendChild(p);
        //скрол вниз
        scrollToBottom();
        //p.value = "";
        document.getElementById("Send").value = "";
    }

}
function MesOt(mes){
    let p = document.createElement('p');
    p.textContent = mes;
    p.classList.add('oth');
   
    let div = document.querySelector('.messages');
    if(p.textContent == ""){

    }
    else{
        div.appendChild(p);
        //p.value = "";
       
    }
}
function delAk(){
    localStorage.removeItem('user');
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
                
                lastCount = 0; // Сброс для мгновенной загрузки сообщений
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
         console.log("ЖОПА");
            let p = document.createElement('p');
            p.textContent = text;
            
           
            
         if(username == user){
            p.classList.add('me');
            div.appendChild(p);
        }
         else{
            MesOt(text);
         }


            
        }
    }
   //скролд вниз
    scrollToBottom();
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
            lastCount = 0; // Сбрасываем счетчик, чтобы сообщения нового чата точно отрисовались
            GetMes();
            GetChat();
        });
    });
});