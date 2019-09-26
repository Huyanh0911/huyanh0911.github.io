import chatController from "../Controllers/chatController.js"
import conversationController from "../Controllers/ConversationController.js"
import {activeConversation,listenConversation} from "../Models/conversation.js"
import user from "../Models/user.js"
const ui = 
`
<div class="flex-container height-100">
<div class="element grow-1">
<div id="js-conversationHeader"></div>
<div id="js-conFrame"></div>
</div>
<div class="flex-container flex-colum grow-3">
    <div class="element">
        <h4>Title</h4>
    </div>
<div class="flex-container element grow-1 vertical-scroll">
<div class="element grow-3 flex-container flex-colum">
    <div class=" element grow-1 vertical-scroll" id="js-chatFrame">
        
    </div>
    <div class="element">
    <form id="js-formChat">
        <div class="flex-container">
            <div class="grow-1">
                <input type="text" class="width-100" id="js-userInput">
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    </form>
    </div>
</div>
<div class="element grow-1">
    <div id="js-listUserFrame">

    </div>
    <div>
        <form id="js-formAddUser">
            <input id="js-inputAddUser" type="text" placeholder="Type email here ...">
        </form>
    </div>
</div>
</div>
</div>


</div>
`;

const formCreateHTML =`
<form id="js-formCreate">
<div>Name:</div>
<div><input type="text" class="width-100" id="js-conName"></div>
<div>Email:</div>
<div><input type="text" class="width-100" id="js-conEmail"></div>
<div>
<button class="width-100" type="submit">Create</button>
</div>
</form>
`;
const btnShowHTML=`
<button class="width-100" id="js-btnShow">Create new conversation</button>
`;
//  ----------------------------------------------------------
function onLoad(){
// subscribe(chatSceen);
const formChat = document.getElementById("js-formChat")
const formAddUser = document.getElementById("js-formAddUser")
const btnshowCreateConversationForm =document.getElementById("js-showCreateConversationForm")
const conFrame = document.getElementById("js-conFrame")
conFrame.addEventListener("click",function(event){
    chatController.changeActiveCon(event.target.id)
})
formChat.addEventListener("submit",function(event){
    event.preventDefault();
    chatController.sendMessage(formChat["js-userInput"].value)
    formChat["js-userInput"].value=""
});
formAddUser.addEventListener("submit",function(event){
    event.preventDefault();
    chatController.addUser(formAddUser["js-inputAddUser"].value)
    formAddUser["js-inputAddUser"].value=""
});
addBtnShow();
listenConversation();
}
//  ----------------------------------------------------------
function addBtnShow(){
    const conHeader = document.getElementById("js-conversationHeader")
    conHeader.innerHTML = btnShowHTML;
    const btnShow =
    document.getElementById("js-btnShow")
    btnShow.addEventListener("click",function(){
        addFormCreate();
    })
}
//  ----------------------------------------------------------
function addFormCreate(){
    const conHeader = document.getElementById("js-conversationHeader")
    conHeader.innerHTML = formCreateHTML
    const formCreate = document.getElementById("js-formCreate")
    formCreate.addEventListener("submit",function(event){
        event.preventDefault();
        const name = formCreate["js-conName"].value
        const email = formCreate["js-conEmail"].value
        conversationController.createConversation(name,email)
        addBtnShow();
    })
}
//  ----------------------------------------------------------
function addMessage(message){
    const owner = message.user === user.authedUser.email ? "host" : "guest"
    const msg = `
    <div class="vertical-10"></div>
    <div class="flex-container ${owner === "host" ? "justify-end":""}">
    <small>${message.user}</small>
    <br/>
    <span class=" msg msg-${owner}">${message.content}</span>
    </div>
    `;
    const chatFrame = document.getElementById("js-chatFrame")
    chatFrame.insertAdjacentHTML("beforeend",msg)
}
//  ----------------------------------------------------------
function addBulkMessages(messages){
    messages.forEach(function(message){
        addMessage(message)

    })
}
//  ----------------------------------------------------------
function addCon(conversation){
    const con = `
    <div id="${conversation.id}" class="chat-con-item ${conversation.id === activeConversation ? "active" : null}">
    ${conversation.name}
    </div>
    `
    const conFrame = document.getElementById("js-conFrame")
    
    conFrame.insertAdjacentHTML("beforeend",con)
    
    
}
//  ----------------------------------------------------------
function updateUserList(listUser){
    console.log(listUser)
    const userListFrame = document.getElementById("js-listUserFrame")
    userListFrame.innerHTML=""
    let listUserHtml=""
    for (let i =0; i<listUser.length; i++) {
        listUserHtml += `
        <div>${listUser[i]}</div>
        `
    }
    console.log(listUserHtml)
    userListFrame.insertAdjacentHTML("beforeend",listUserHtml)
}
//  ----------------------------------------------------------
function updateActiveCon(oldConId){
    if (oldConId !== null ){
        const currentActiveCon = document.getElementById(oldConId)
        currentActiveCon.classList.remove("active")
    }
    const nextActiveCon = document.getElementById(activeConversation)
    nextActiveCon.classList.add("active")
}
//  ----------------------------------------------------------
function clearMessages(){
const chatFrame = document.getElementById("js-chatFrame")
chatFrame.innerHTML=""
}
//  ----------------------------------------------------------
const chatSceen={
    ui : ui,
    onLoad : onLoad,
    addMessage: addMessage,
    addCon: addCon,
    updateUserList: updateUserList,
    updateActiveCon: updateActiveCon,
    clearMessages: clearMessages,
    addBulkMessages: addBulkMessages
}
export default chatSceen
 