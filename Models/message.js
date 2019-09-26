import user from "./user.js";
import {activeConversation} from "./conversation.js";
import chatScreen from "../Views/chat.js";
//  ----------------------------------------------------------
let unsubscribe = null
function subscribe(){
    return db
    .collection("messages")
    .where("conversation",'==',activeConversation)
    
    .onSnapshot(function(snapshot){
         const messages = snapshot.docChanges()
         for(let i = 0; i < messages.length; i++){
             if (messages[i].type === "added"){
                chatScreen.addMessage(messages[i].doc.data())
            }
         }
     });
 }
//  ----------------------------------------------------------
function newMessage(content){
    return{
        content : content,
        user : user.authedUser.email,
        conversation: activeConversation
    }

}
//  ----------------------------------------------------------
function saveMessage(message){
db.collection("messages")
.doc()
.set({
    ...message,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
})
.then(function(){
    console.log("Message sent!")
})
.catch(function(err){
    console.error("Failed to send message",err)
})
}
//  ----------------------------------------------------------
function changeActiveCon(){
    if (unsubscribe !== null){
        unsubscribe();
    }
    chatScreen.clearMessages()
    unsubscribe= subscribe()
}


//  ----------------------------------------------------------
export{newMessage, saveMessage,changeActiveCon};