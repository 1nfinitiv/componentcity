$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});
// const {check}=require("express-validator")
axios.defaults.baseURL = 'http://127.0.0.1:8000'
let botton = document.querySelector('#click')
let botton1 = document.querySelector('#click1')
let err = document.querySelector('.action')

// Написать валидацию для входа

// Написать отправку почты
function validation(err) {
    function AddError(input, text) {
        const parent = input.parentNode
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    }
    function RemoveError(input){
        const parent = input.parentNode
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }
    let result = true
    err.querySelectorAll('input').forEach(input =>{
        RemoveError(input)
        if(input.dataset.required==='true'){
            RemoveError(input)
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            const address = document.querySelector('#email').value
            if(reg.test(address) === false) {
                AddError(input,'Fill correct email')
                result = false
            }
        }
        if (input.dataset.minLength){
            if (input.value.length<input.dataset.minLength){
                RemoveError(input)
                AddError(input,`Minimum number of characters: ${input.dataset.minLength}`)
                result = false
            }
        }
        if (input.dataset.maxLength){
            if (input.value.length>input.dataset.maxLength){
                RemoveError(input)
                AddError(input,`Maximum number of characters: ${input.dataset.maxLength}`)
                result = false
            }
        }
        if (input.value==='') {
            RemoveError(input)
            console.log('Ошибка')
            AddError(input,'The field is not filled')
            result=false
        }

    })
    return result
}
// register
const addNewUser = async (newUser) => {
    try {
        const response = await axios.post('/registration', newUser)
        return response.data.answer
    } catch (err) {
        console.error(err.response.data.message)
    }
}
const LogIn = async (data)=>{
    try{
        const response = await axios.post('/login', data)
        return response.data.answer
    }catch (err){
        console.error(err.response.data.message)
    }
}
botton.addEventListener('click', function(){
    console.log('work')
    let password = document.querySelector('#password').value
    console.log(password)
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    if(validation(err)===true){
        let confirmation = document.querySelector('.confirmation')
        confirmation.innerHTML=''
        confirmation.innerHTML+=`<div class="input-box">
            <input id="code" type="text" placeholder="code confirmation"/>
                  </div>`
        addNewUser({User_name:name, User_password:password, Email_adress:email})
    }
})
botton1.addEventListener('click', function (){
    console.log('work')
    let password = document.querySelector('#password1').value
    let login = document.querySelector('#username').value
    LogIn({User_name: login, User_password: password})
})