import setScreen from './index.js'
import registerScreen from "./register.js"
import authController from "../Controllers/authController.js"
import{responseCode} from "../Controllers/response.js"
import chatSceen from './chat.js'
const form =`
<form id="js-loginForm">

<label>Email</label>
<input type="email" id="email"/>
<label>Password</label>
<input type="password" id="password"/>
<button type="submit">Login</button>
<button type="button" id="js-btnMoveToRegister">Move to Register</button>
</form>
`

function onLoad(){
  const formLogin = document.getElementById("js-loginForm");
  formLogin.addEventListener("submit",async function(event){
    event.preventDefault();
    const request = {
      email: formLogin.email.value,
      password: formLogin.password.value
    }
    const response = await authController.login(request)
    switch(response.code){
      case responseCode.auth.email_not_verify:
        alert("Account not active! Check your email!")
        return;
      case responseCode.auth.login_success:
        setScreen(chatSceen)
        return;

    }
  })
  const btnMoveToRegister=document.getElementById("js-btnMoveToRegister");
  btnMoveToRegister.addEventListener("click",function(){
    setScreen(registerScreen)
  })
}



export default {
    ui : form,
    onLoad : onLoad 
}