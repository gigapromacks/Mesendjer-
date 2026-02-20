let  user  = localStorage.getItem('user'); 
console.log(user);
if(user){
console.log("да")
}
else{
    console.log("нет")
    window.location.href = '/reg';
}













//
//
//        ФУНКЦИИ
//
//
async function SendMes(){
    let inp = document.getElementById("Send").value;
    let p = document.createElement('p');
    p.textContent = inp;
    p.classList.add('me');
   let chat = "";// для теста
    let div = document.querySelector('.messages');
    
    let vse = document.querySelectorAll('.chats');
    
    vse.forEach(function(el){
    
        let chatD = el.querySelector('.chat');
        
       
        if (chatD.classList.contains('active')) {
            
            chat =chatD.textContent;
        
        }
        
    
    });
  
  
  
  
  
  
  
    if(p.textContent == "" || chat ==""){

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
async function GetMes(){
    
    let vse = document.querySelectorAll('.chats');
    let chat = "";
    vse.forEach(function(el){
    
        let chatD = el.querySelector('.chat');
        
       
        if (chatD.classList.contains('active')) {
            
            chat =chatD.textContent;
        
        }
        
    
    });
    if(chat == ""){
        return;
    }
    else{
        let div = document.querySelector('.messages');
        div.innerHTML = '';
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
document.addEventListener('DOMContentLoaded', function() {
    const chat = document.querySelectorAll('.chat');
    
    chat.forEach(Chat => {
        
        Chat.addEventListener('click', function() {
           // Убираем класс active у всех чатов
           chat.forEach(c => c.classList.remove('active'));
            
           // Добавляем класс active только текущему чату
           this.classList.add('active');
           
           // После выбора чата загружаем сообщения
           GetMes();
        });
    });
});