$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// const {check}=require("express-validator")
axios.defaults.baseURL = 'http://127.0.0.1:8000'
let botton = document.querySelector('#click')
let botton1 = document.querySelector('#click1')
let err = document.querySelector('.register-form')
let err_login = document.querySelector('.box_login')

// Написать валидацию для входа

// Написать отправку почты
function errorRegisterBackAdd(login, text){
    const parent= login.parentNode
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('error-label')
    errorLabel.textContent = text
    parent.classList.add('error')
    parent.append(errorLabel)
}

function errorBackAdd(err_login, text){
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('error-label')
    errorLabel.textContent = text
    err_login.classList.add('error')
    err_login.append(errorLabel)

}
function errorBackRemove(err_login){
    if (err_login.classList.contains('error')){
        err_login.classList.remove('error')
        err_login.querySelector('.error-label').remove()
    }
}
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
        return response.data
    } catch (err) {
        console.error(err.response.data.message)
        let login = document.querySelector(err.response.data.id)
        errorRegisterBackAdd(login, err.response.data.message)
    }
}
const LogIn = async (data)=>{
    try{
        const response = await axios.post('/login', data)
        return response.data
    }catch (err){
        console.error(err.response.data.message)
        errorBackAdd(err_login, err.response.data.message)
    }
}
const Code = async (code) =>{
    try {
        const response = await axios.post('/login_id_number', code)
        return response.data
    }catch (err){
        console.log(err)
    }
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}
botton.addEventListener('click', function(){
    console.log('work')
    if(validation(err)===true){
        let password = document.querySelector('#password').value
        let name = document.querySelector('#name').value
        let email = document.querySelector('#email').value
        const random_code = getRandom(10000,99999).toString()
        console.log(random_code)
        addNewUser({User_name:name, User_password:password, Email_adress:email, Code_verification:random_code})
        const confirmation = document.querySelector('.confirmation')
        confirmation.innerHTML=''
        confirmation.innerHTML+=`<div class="input-box">
            <input id="code" type="text" placeholder="code confirmation"/>
                  </div>`
        document.querySelector('button').remove()
        confirmation.innerHTML += `<button id="new_click">create</button>`
        let new_click = document.querySelector('#new_click')
        new_click.addEventListener('click', function (){
            let code = document.querySelector('#code').value
            if (code===random_code){
                Code({'Login_id':'1'})
            }
            else {
                Code({'Login_id':'2'})
            }
                })


    }
})
botton1.addEventListener('click', function (){
    console.log('work')
    errorBackRemove(err_login)
    let password = document.querySelector('#password1').value
    let login = document.querySelector('#username').value
    LogIn({User_name: login, User_password: password})
})