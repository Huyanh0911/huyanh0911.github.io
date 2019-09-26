import setScreen from './index.js'
import loginScreen from "./login.js"
import authController from "../Controllers/authController.js"
import {responseCode} from "../Controllers/response.js"

const screen = `
<form id="js-formRegister">
<div>
 <label>Name</label>
 <input type="text" id="name"/>
</div>
<div>
 <label>Email</label>
 <input type="email" id="email"/>
</div>
<div>
 <label>Password</label>
 <input type="password" id="password"/>
</div>
<div>
 <label>Confirm Password</label>
 <input type="password" id="cfpassword"/>
</div>
<div>
 <button type="submit">Register</button>
 <button type="button" id="js-btnBackToLogin">Back to Login</button>
</div>
</form>
`;
function onLoad()
{
    const btnBackToLogin=document.getElementById("js-btnBackToLogin");
    const formRegister = document.getElementById("js-formRegister");
    formRegister.addEventListener("submit",async function(event){
        event.preventDefault();
        const request = {
            name:formRegister.name.value,
            email:formRegister.email.value,
            password:formRegister.password.value,
            cfpassword:formRegister.cfpassword.value,

        }
      const response = await authController.register(request)
      switch (response.code){
          case responseCode.auth.register_success :
          alert ("Resgister Successfully! Login to enjoy!")
          return
      }
        
    });
    btnBackToLogin.addEventListener("click",function(){
        setScreen(loginScreen)
  
      });
    

}
export default {
    ui:screen,
    onLoad:onLoad
}