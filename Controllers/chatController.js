import {newMessage, saveMessage,changeActiveCon} from "../Models/message.js"
import { addUser, updateActiveCon } from "../Models/conversation.js"
const chatController = {
sendMessage: function(content){
    const message = newMessage(content);
    saveMessage(message);
},
addUser: function(email){
    addUser(email)
}, 
changeActiveCon: function(nextConId){
    updateActiveCon(nextConId)
    changeActiveCon()
    
}
};
export default chatController;