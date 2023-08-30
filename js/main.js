$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});
const {check}=require("express-validator")
axios.defaults.baseURL = 'http://127.0.0.1:8000'
let botton = document.querySelector('#click')
let botton1 = document.querySelector('#click1')
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
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    addNewUser({User_name:name, User_password:password, Email_adress:email})
})
botton1.addEventListener('click', function (){
    console.log('work')
    let password = document.querySelector('#password1').value
    let login = document.querySelector('#username').value
    LogIn({User_name: login, User_password: password})
})